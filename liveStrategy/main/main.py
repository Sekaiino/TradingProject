from utils.supAndRes import SupportAndResistance
from utils.customIndicators import SuperTrend
from utils.binanceSpot import Binance
from datetime import datetime, timedelta
from typing import Optional
from dotenv import load_dotenv
import pandas as pd
import requests
import ta
import os

# Main function that will start the code
def main(secret: dict, paramCoins: dict) -> None:
    """Define main function to start our object

    Raises:
        ValueError: Wallet Exposure must be less or equal than 1
    """
    # Checking if fetched data is correct, if not stop the code and raise an error
    if sum(d["wallet_exposure"] for d in paramCoins.values() if d) > 1:
        raise ValueError("Wallet exposure must be less or equal than 1")

    superReversal: object = Users(secret, paramCoins, "1h", ["long", "short"])
    superReversal.checkOrderState()
    superReversal.getSuperTrend()
    superReversal.superReversalStrategy()

class Users():
    def __init__(self, secret: dict, paramCoins: dict, timeframe: str, type: list=["long"]) -> None:
        # general variables
        self.dfList: dict = {}
        self.positions: list = []
        self.leverage: int = 1
        self.paramCoins: dict = paramCoins
        self.timeframe: str = timeframe
        self.sr: object = SupportAndResistance()
        self.startDate: str = (datetime.now() + timedelta(days=-15)).strftime("%d %B %Y").lower()
        self.availableWalletPct: float = 1.01
        self.useLong: bool = True if "long" in type else False
        self.useShort: bool = True if "short" in type else False

        # client object relative variables
        self.client: object = Binance(
            apiKey=secret["apiKey"],
            secret=secret["secret"]
            )
        self.openOrders: dict = self.client.get_open_orders()
        self.coinBalance: dict = self.client.get_all_balance()
        self.coinInUsd: dict = self.client.get_all_balance_in_usd()
        self.usdBalance: float = self.coinBalance["USDT"]
        del self.coinBalance["BUSD"]
        del self.coinBalance["USDT"]
        del self.coinInUsd["BUSD"]
        del self.coinInUsd["USDT"]
        self.totalBalance: float = self.usdBalance + sum(self.coinInUsd.values())

    def checkOrderState(self) -> None:
        """Checking if there is orders that are partially or totally not filled, if it is cancel them
        """
        for order in self.openOrders:
            if float(order["executedQty"]) > 0:
                print(
                    f"Order on {order['symbol']} is partially fill, create {order['side']} Market of {float(order['origQty']) - float(order['executedQty'])} {order['symbol']} order to complete it"
                )
                self.client.cancel_all_open_order(order["symbol"])
                self.client.place_market_order(order["symbol"], order['positionSide'], order["side"], float(order['origQty']) - float(order['executedQty']), self.leverage)

    def getSuperTrend(self) -> dict:
        """This init the SuperTrend indicators to take trade with it
        """
        for pair in self.paramCoins:
            params: dict = self.paramCoins[pair]
            self.client.cancel_all_open_order(pair)
            df: pd.DataFrame = self.client.get_last_historical(pair, self.timeframe, 2000)
            # -- Populate indicators --
            superTrendObj: object = SuperTrend(
                df["high"],
                df["low"],
                df["close"],
                params["st_short_atr_window"],
                params["st_short_atr_multiplier"],
            );

            df["super_trend_direction"] = superTrendObj.super_trend_direction()
            df["ema_short"] = ta.trend.ema_indicator(
                close = df["close"], window=params["short_ema_window"]
            )
            df["ema_long"] = ta.trend.ema_indicator(
                close = df["close"], window=params["long_ema_window"]
            )

            self.dfList[pair] = df
        
        return self.dfList

    def superReversalStrategy(self) -> None:
        """Buy and sell order to follow the Super Reversal Strategy
        """
        for coin in self.coinInUsd:
            if self.coinBalance[coin] > float(self.client.get_min_order_amount(coin + "USDT")):
                self.positions.append(coin + "USDT")
                self.availableWalletPct -= self.paramCoins[coin + "USDT"]["wallet_exposure"]

        pairToCheck: list = list(set(self.paramCoins.keys()) - set(self.positions))

        #Check the buy signal for every pair
        for pair in pairToCheck:
            # fetch important levels of the coin
            meanLevels: list = self.sr.mean_levels(pairSymbol=pair, startDate=self.startDate, candleMinWindow=1, groupMultiplier=2)
            # iloc -2 to get the last completely close candle
            row = self.dfList[pair].iloc[-2]

            # Check if you have to open a long position
            if ((self.useLong)
                and (row["super_trend_direction"] == True)
                and (row["ema_short"] > row["ema_long"])
                ):
                buyLimitPrice: float = float(self.client.convert_price_to_precision(pair, row["ema_short"]))
                buyQuantityInUsd: float = self.usdBalance * (self.paramCoins[pair]["wallet_exposure"] / self.availableWalletPct)

                buyQuantity: float = float(self.client.convert_amount_to_precision(pair, buyQuantityInUsd / buyLimitPrice))

                if(buyQuantity > 0):
                    exchangeBuyQuantity: float = buyQuantity * buyLimitPrice
                    print(
                        f"Place LONG Limit Order: {buyQuantity} {pair[:-4]} at the price of {buyLimitPrice}$ ~{round(exchangeBuyQuantity, 2)}$"
                    )
                    # Place limit order to execute it when we got the right price
                    self.client.place_limit_order(pair, "BUY", "LONG", buyQuantity, buyLimitPrice, self.leverage)

                    # Place the stop loss at last important level
                    minSl: Optional[float] = meanLevels[0] if meanLevels else None
                    maxSl: float = self.client.get_price_of_one_coin(pair)
                    if minSl:
                        for price in meanLevels:
                            if(price > minSl and price < buyLimitPrice and price < maxSl):
                                minSl = price

                    if minSl > 0 and minSl < maxSl:
                        self.client.place_market_stop_loss(pair, "SELL", "LONG", minSl, self.leverage)

                    # Update data
                    data = {
                        'pairSymbol': pair,
                        'sl': minSl if minSl != 0 else None,
                        'buyQuantity': buyQuantity,
                        'buyPrice': buyLimitPrice,
                        'totalSpend': round(exchangeBuyQuantity, 2),
                        'side': 'LONG'
                    }

                    try:
                        response = requests.post('http://localhost:8000/api/trade/create', data=data)
                        if not response.ok:
                            print('Impossible to post trade to the database')
                    except:
                        print('HTTP error')
                        pass
            
            # Check if you have to open a short position
            elif((self.useShort)
                and (row["super_trend_direction"] == False)
                and (row["ema_short"] < row["ema_long"])
                ):
                buyLimitPrice: float = float(self.client.convert_price_to_precision(pair, row["ema_long"]))
                buyQuantityInUsd: float = self.usdBalance * (self.paramCoins[pair]["wallet_exposure"] / self.availableWalletPct)

                buyQuantity: float = float(self.client.convert_amount_to_precision(pair, buyQuantityInUsd / buyLimitPrice))

                if(buyQuantity > 0):
                    exchangeBuyQuantity: float = buyQuantity * buyLimitPrice
                    print(
                        f"Place SHORT Limit Order: {buyQuantity} {pair[:-4]} at the price of {buyLimitPrice}$ ~{round(exchangeBuyQuantity, 2)}$"
                    )
                    # Place limit order to execute it when we got the right price
                    self.client.place_limit_order(pair, "SELL", "SHORT", buyQuantity, buyLimitPrice, self.leverage)

                    # Place a market stop loss at the last important level
                    minSl: Optional[float] = meanLevels[0] if meanLevels else None
                    maxSl: float = self.client.get_price_of_one_coin(pair)
                    if minSl:
                        for price in meanLevels:
                            if(price < minSl and price > buyLimitPrice and price > maxSl):
                                minSl = price

                    if minSl > maxSl:
                        self.client.place_market_stop_loss(pair, "BUY", "SHORT", minSl, self.leverage)

                    # Update data
                    data = {
                        'pairSymbol': pair,
                        'sl': minSl if minSl != 0 else None,
                        'buyQuantity': buyQuantity,
                        'buyPrice': buyLimitPrice,
                        'totalSpend': round(exchangeBuyQuantity, 2),
                        'side': 'SHORT'
                    }

                    try:
                        response = requests.post('http://localhost:8000/api/trade/create', data=data)
                        if not response.ok:
                            print('Impossible to post trade to the database')
                    except:
                        print('HTTP error')
                        pass

            # If no opportunity, start the next iteration
            else:
                continue

        # Check the sell signal for every open positions
        for pair in self.positions:
            row = self.dfList[pair].iloc[-2]

            # Check if you have to close the long position
            if ((self.useLong)
                and (row["ema_short"] > row["low"])
                and (row["super_trend_direction"] == False 
                or row["ema_short"] < row["ema_long"])
                ):
                self.client.cancel_all_open_order(pair)
                sellLimitPrice: float = float(self.client.convert_price_to_precision(pair, row["ema_short"]))
                sellQuantity: float = float(self.client.convert_amount_to_precision(pair, self.coinBalance[pair[:-4]]))
                exchangeSellQuantity: float = sellQuantity * sellLimitPrice
                print(
                    f"Place CLOSE LONG Limit Order: {sellQuantity} {pair[:-4]} at the price of {sellLimitPrice}$ ~{round(exchangeSellQuantity, 2)}$"
                )
                # Place limit order to execute it when we got the right price
                self.client.place_limit_order(pair, "SELL", "LONG", sellQuantity, sellLimitPrice, self.leverage)
            
            # Check if you have to close the short position
            if((self.useShort)
               and (row["ema_long"] > row["high"])
               and (row["super_trend_direction"] == True
               or row["ema_long"] < row["ema_short"])
            ):
                self.client.cancel_all_open_order(pair)
                sellLimitPrice: float = float(self.client.convert_price_to_precision(pair, row["ema_short"]))
                sellQuantity: float = float(self.client.convert_amount_to_precision(pair, self.coinBalance[pair[:-4]]))
                exchangeSellQuantity: float = sellQuantity * sellLimitPrice
                print(
                    f"Place CLOSE SHORT Limit Order: {sellQuantity} {pair[:-4]} at the price of {sellLimitPrice}$ ~{round(exchangeSellQuantity, 2)}$"
                )
                # Place limit order to execute it when we got the right price
                self.client.place_limit_order(pair, "BUY", "SHORT", sellQuantity, sellLimitPrice, self.leverage)

# Start algo
if __name__ == "__main__":
    # Fetching config data from the database
    response = requests.get('http://localhost:8000/api/coinconfig/get/')
    if response.ok:
        paramCoins: dict = response.json()['coinconfig'][0]
        del paramCoins['_id']
    else:
        response.raise_for_status()

    load_dotenv()
    API_KEY: str    = os.getenv('API_KEY')
    SECRET_KEY: str = os.getenv('API_SECRET')
    binanceAuth: dict = { "apiKey": API_KEY, "secret": SECRET_KEY }

    # run main function
    main(secret=binanceAuth, paramCoins=paramCoins)