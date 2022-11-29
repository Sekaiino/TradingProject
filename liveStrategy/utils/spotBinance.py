from binance.helpers import round_step_size
from binance import Client
from typing import Optional
import pandas as pd
import math
import time

class Binance():
    def __init__(self, apiKey=None, secret=None) -> None:
        if secret == None:
            self._auth = False
            self._session = Client()
        else:
            self._auth = True
            self._session = Client(api_key=apiKey, api_secret=secret)
    
    def authentication_required(fn):
        """Annotation for methods that require auth."""
        def wrapped(self, *args, **kwargs):
            if not self._auth:
                print("You must be authenticated to use this method", fn)
                exit()
            else:
                return fn(self, *args, **kwargs)
        return wrapped

    # Market part
    def get_historical(self, symbol: str, timeframe: str, startDate: str=None, limit: int=1000) -> Optional[pd.DataFrame]:
        try:
            tempData = self._session.get_historical_klines(symbol=symbol, interval=timeframe, start_str=startDate, limit=limit)
            dfTemp = pd.DataFrame(tempData)
            dfTemp = dfTemp.rename(columns={
                0: "open time",
                1: "open",
                2: "high",
                3: "low",
                4: "close",
                5: "volume",
                6: "close time",
                7: "quote asset volume",
                8: "number of trades",
                9: "taker buy base asset volume",
                10: "taker buy quote asset volume",
                11: "ignore",
            })

            del dfTemp["open time"]
            del dfTemp["close time"]
            del dfTemp["quote asset volume"]
            del dfTemp["number of trades"]
            del dfTemp["taker buy base asset volume"]
            del dfTemp["taker buy quote asset volume"]
            del dfTemp["ignore"]
        
        except:
            return None

        return dfTemp

    def get_bid_ask_price(self, symbol: str) -> dict:
        try:
            ticker = self._session.get_order_book(symbol=symbol)

        except BaseException as err:
            print("An error occured:\n", err)
            exit()

        return { "bid": ticker["bids"],"ask": ticker["asks"] }

    # Get balance part
    @authentication_required
    def get_balance(self, coinSymbol: str=None) -> Optional[dict]:
        try:
            balance = self._session.futures_account_balance()

            if coinSymbol != None:
                for coin in balance:
                    if coin['asset'] == coinSymbol:
                        try:
                            return float(coin['balance'])
                        except:
                            return 0

            coinBalance: dict = {}
            for coin in balance:
                if float(coin['balance']) == 0.0000:
                    continue
                else:
                    coinBalance[coin["asset"]] = float(coin['balance'])

        except BaseException as err:
            print("An error occured:\n", err)
            exit()

        return None if coinBalance == {} else coinBalance
    
    @authentication_required
    def get_all_balance_in_usd(self) -> Optional[dict]:
        try:
            balance = self._session.futures_account_balance()
            usdBalance: dict = {}

            for coin in balance:
                try:
                    if float(coin["balance"]) > 0.000:
                        if coin["asset"] != "BUSD" and coin["asset"] != "USDT":
                            usdBalance[coin["asset"]] = float(coin["balance"]) * float(self._session.get_symbol_ticker(symbol= coin["asset"] + "BUSD")["price"])
                        else:
                            usdBalance[coin["asset"]] = float(coin["balance"])
                except:
                    print(f"Cannot get price of {coin['asset']}/BUSD")
                    pass

        except BaseException as err:
            print("An error occured:\n", err)
            exit()

        return None if usdBalance == {} else usdBalance

    @authentication_required
    def get_av_balance(self):

        while True:
            try:
                account_info = self._session.futures_account()

                av_balance = None
                for asset in account_info["assets"]:
                    if asset["asset"] == "USDT":
                        av_balance = float(asset["availableBalance"])

                if len(account_info) > 0:
                    av_balance = float("{:.2f}".format(av_balance))
                    return av_balance

            except Exception as e:
                print("Account Error:", e)
                time.sleep(1)
                pass

    # Place order part
    @authentication_required
    def place_order(self, symbol: str, side: str, type: str, amount: float, timeInForce: str):
        try:
            stepSize: float = 0.0
            info = self._session.futures_exchange_info()

            for symbol_info in info['symbols']:
                if symbol_info['symbol'] == symbol:
                    for symbol_filter in symbol_info['filters']:
                        if symbol_filter['filterType'] == 'PRICE_FILTER':
                            stepSize = float(symbol_filter['tickSize'])


            # precision = int(round(-math.log(stepSize, 10), 0))
            # amount = float(round(amount, precision))
            ticker = self._session.get_symbol_ticker(symbol=symbol)
            price = round_step_size(float(ticker['price']), stepSize)
            
            self._session.futures_create_order(symbol=symbol, side=side, type=type, positionSide='LONG', quantity=amount, timeInForce=timeInForce, price=price)

        except BaseException as err:
            print(f"An error occured:\n{err}")
            exit()