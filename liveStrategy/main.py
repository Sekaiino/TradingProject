from utils.supAndRes import SupportAndResistance
from utils.customIndicators import SuperTrend
from utils.spotFTX import SpotFTX
from datetime import datetime, timedelta
import json
import ta

# Main function that will start the code
def main(secret, paramCoins):
    """Define main function to start our object

    Raises:
        ValueError: Wallet Exposure must be less or equal than 1
    """
    # Checking if fetched data is correct, if not stop the code and raise an error
    if sum(d["wallet_exposure"] for d in paramCoins.values() if d) > 1:
        raise ValueError("Wallet exposure must be less or equal than 1")

    for x in secret:
        superReversal = Users(secret[x], paramCoins, "1h", ["long", "short"])
        superReversal.checkOrderState()
        superReversal.getSuperTrend()
        superReversal.superReversalStrategy()

class Users():
    def __init__(self, secret, paramCoins, timeframe, type=["long"]) -> None:
        # general variables
        self.dfList = {}
        self.positions = []
        self.leverage = 1
        self.paramCoins = paramCoins
        self.timeframe = timeframe
        self.sr = SupportAndResistance()
        self.startDate = (datetime.now() + timedelta(days=-15)).strftime("%d %B %Y").lower()
        self.availableWalletPct = 1.01
        self.useLong = True if "long" in type else False
        self.useShort = True if "short" in type else False

        # FTX object relative variables
        self.ftx = SpotFTX(
            apiKey=secret["apiKey"],
            secret=secret["secret"],
            subAccountName=secret["subAccountName"],
            )
        self.openOrders = self.ftx.get_open_order()
        self.coinBalance = self.ftx.get_all_balance()
        self.coinInUsd = self.ftx.get_all_balance_in_usd()
        self.usdBalance = self.coinBalance["USD"]
        del self.coinBalance["USD"]
        del self.coinInUsd["USD"]
        self.totalBalance = self.usdBalance + sum(self.coinInUsd.values())

    def checkOrderState(self):
        """Checking if there is orders that are partially or totally not filled, if it is cancel them
        """
        for order in self.openOrders:
            order = order["info"]
            if float(order["filledSize"]) > 0:
                print(
                    f"Order on {order['market']} is partially fill, create {order['side']} Market of {order['remainingSize']} {order['market']} order to complete it"
                )
                self.ftx.cancel_all_open_order(order["market"])
                self.ftx.place_market_order(order["market"], order["side"], order["remainingSize"])

    def getSuperTrend(self):
        """This init the SuperTrend indicators to take trade with it
        """
        for pair in self.paramCoins:
            params = self.paramCoins[pair]
            self.ftx.cancel_all_open_order(pair)
            df = self.ftx.get_last_historical(pair, self.timeframe, 2000)
            # -- Populate indicators --
            superTrendObj = SuperTrend(
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

    def superReversalStrategy(self):
        """Buy and sell order to follow the Super Reversal Strategy
        """
        for coin in self.coinInUsd:
            if self.coinBalance[coin] > float(self.ftx.get_min_order_amount(coin + "-PERP")):
                self.positions.append(coin + "-PERP")
                self.availableWalletPct -= self.paramCoins[coin + "/USD"]["wallet_exposure"]

        pairToCheck = list(set(self.paramCoins.keys()) - set(self.positions))

        #Check the buy signal for every pair
        for pair in pairToCheck:
            # Place our min stop loss to 0 and fetch important levels of the coin
            minSl = 0
            meanLevels = self.sr.mean_levels(pairSymbol=pair.replace('-PERP', 'USDT'), startDate=self.startDate, candleMinWindow=1, groupMultiplier=2)
            # iloc -2 to get the last completely close candle
            row = self.dfList[pair].iloc[-2]

            # Fetch data to update it
            with open("liveStrategy/json/data.json", "r") as f:
                data = json.load(f)

            # Check if you have to open a long position
            if ((self.useLong)
                & (row["super_trend_direction"] == True)
                & (row["ema_short"] > row["ema_long"])
                ):
                buyLimitPrice = float(self.ftx.convert_price_to_precision(pair, row["ema_short"]))
                buyQuantityInUsd = self.usdBalance * (self.paramCoins[pair]["wallet_exposure"] / self.availableWalletPct)

                buyQuantity = float(self.ftx.convert_amount_to_precision(pair, buyQuantityInUsd / buyLimitPrice))

                if(buyQuantity > 0):
                    exchangeBuyQuantity = buyQuantity * buyLimitPrice
                    print(
                        f"Place LONG Limit Order: {buyQuantity} {pair[:-4]} at the price of {buyLimitPrice}$ ~{round(exchangeBuyQuantity, 2)}$"
                    )
                    # Place limit order to execute it when we got the right price
                    self.ftx.place_limit_order(pair, "buy", buyQuantity, buyLimitPrice, self.leverage)

                    # Place the stop loss at last important level
                    for price in meanLevels:
                        if(price > minSl and price < buyLimitPrice):
                            minSl = price
                    
                    self.ftx.place_market_stop_loss(pair, "sell", buyQuantity, minSl, self.leverage)

                    # Update data
                    data[pair]['buyPrice'] = buyLimitPrice
                    data[pair]['side'] = "Long"
            
            # Check if you have to open a short position
            elif((self.useShort)
                & (row["super_trend_direction"] == False)
                & (row["ema_short"] < row["ema_long"])
                ):
                buyLimitPrice = float(self.ftx.convert_price_to_precision(pair, row["ema_long"]))
                buyQuantityInUsd = self.usdBalance * (self.paramCoins[pair]["wallet_exposure"] / self.availableWalletPct)

                buyQuantity = float(self.ftx.convert_amount_to_precision(pair, buyQuantityInUsd / buyLimitPrice))

                if(buyQuantity > 0):
                    exchangeBuyQuantity = buyQuantity * buyLimitPrice
                    print(
                        f"Place SHORT Limit Order: {buyQuantity} {pair[:-4]} at the price of {buyLimitPrice}$ ~{round(exchangeBuyQuantity, 2)}$"
                    )
                    # Place limit order to execute it when we got the right price
                    self.ftx.place_limit_order(pair, "sell", buyQuantity, buyLimitPrice, self.leverage)

                    # Place a market stop loss at the last important level
                    for price in meanLevels:
                        if(price < minSl and price > buyLimitPrice):
                            minSl = price

                    self.ftx.place_market_stop_loss(pair, "buy", buyQuantity, minSl, self.leverage)

                    # Update data
                    data[pair]['buyPrice'] = buyLimitPrice
                    data[pair]['side'] = "Short"

            # If no opportunity, start the next iteration
            else:
                continue

            # Register the buy price for the coin to place our stop loss later
            with open("liveStrategy/json/data.json", "w") as f:
                json.dump(data, f, indent=4)

        # Check the sell signal for every open positions
        for pair in self.positions:
            row = self.dfList[pair].iloc[-2]

            # Check if you have to close the long position
            if ((self.useLong)
                & (row["ema_short"] > row["low"])
                & (row["super_trend_direction"] == False 
                | row["ema_short"] < row["ema_long"])
                ):
                self.ftx.cancel_all_open_order(pair)
                sellLimitPrice = float(self.ftx.convert_price_to_precision(pair, row["ema_short"]))
                sellQuantity = float(self.ftx.convert_amount_to_precision(pair, self.coinBalance[pair[:-4]]))
                exchangeSellQuantity = sellQuantity * sellLimitPrice
                print(
                    f"Place CLOSE LONG Limit Order: {sellQuantity} {pair[:-4]} at the price of {sellLimitPrice}$ ~{round(exchangeSellQuantity, 2)}$"
                )
                # Place limit order to execute it when we got the right price
                self.ftx.place_limit_order(pair, "sell", sellQuantity, sellLimitPrice, self.leverage)
            
            # Check if you have to close the short position
            if((self.useShort)
               & (row["ema_long"] > row["high"])
               & (row["super_trend_direction"] == True
               | row["ema_long"] < row["ema_short"])
            ):
                self.ftx.cancel_all_open_order(pair)
                sellLimitPrice = float(self.ftx.convert_price_to_precision(pair, row["ema_short"]))
                sellQuantity = float(self.ftx.convert_amount_to_precision(pair, self.coinBalance[pair[:-4]]))
                exchangeSellQuantity = sellQuantity * sellLimitPrice
                print(
                    f"Place CLOSE SHORT Limit Order: {sellQuantity} {pair[:-4]} at the price of {sellLimitPrice}$ ~{round(exchangeSellQuantity, 2)}$"
                )
                # Place limit order to execute it when we got the right price
                self.ftx.place_limit_order(pair, "buy", sellQuantity, sellLimitPrice, self.leverage)

# Start algo
if __name__ == "__main__":
    # Fetching config data
    with open("liveStrategy/json/coinconfig.json", 'r') as f:
        paramCoins = json.load(f);

    with open("liveStrategy/json/config.json", 'r') as f:
        secret = json.load(f);

    # run main function
    main(secret=secret, paramCoins=paramCoins)