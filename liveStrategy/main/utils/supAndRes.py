import string
import pandas as pd
from binance.client import Client

class SupportAndResistance:
    def get_data_from_api(self, pair_symbol, startDate = "1 january 2021"):
        # -- Define Binance Client --
        client = Client()

        timeInterval = Client.KLINE_INTERVAL_30MINUTE

        # -- Load all price data from binance API --
        klinesT = client.get_historical_klines(pair_symbol, timeInterval, startDate)

        # -- Define your dataset --
        df = pd.DataFrame(klinesT, columns = ['timestamp', 'open', 'high', 'low', 'close', 'volume', 'close_time', 'quote_av', 'trades', 'tb_base_av', 'tb_quote_av', 'ignore' ])
        df['close'] = pd.to_numeric(df['close'])
        df['high'] = pd.to_numeric(df['high'])
        df['low'] = pd.to_numeric(df['low'])
        df['open'] = pd.to_numeric(df['open'])

        # -- Set the date to index --
        df = df.set_index(df['timestamp'])
        df.index = pd.to_datetime(df.index, unit='ms')
        del df['timestamp']

        # -- Drop all columns we do not need --
        df = df.loc[:,['open', 'high', 'low', 'close']]

        return df

    def get_n_columns(self, df, columns, n=1):
        dt = df.copy()
        for col in columns:
            dt["n"+str(n)+"_"+col] = dt[col].shift(n)
        return dt

    def get_top_and_bottom(self, df, candle_min_window=3):
        originals_columns = list(df.columns.copy())
        originals_columns.append("top")
        originals_columns.append("bottom")
        dt = df.copy()
        dt["bottom"] = 1
        dt["top"] = 1

        for i in range(1, candle_min_window + 1, 1):
            dt = self.get_n_columns(dt, ['close'], i)
            dt = self.get_n_columns(dt, ['close'], -i)

            dt.loc[
                (dt["n" + str(-i) + "_close"] < dt["close"]) 
                | (dt["n" + str(i) + "_close"] < dt["close"])
                , "bottom"
            ] = 0

            dt.loc[
                (dt["n" + str(-i) + "_close"] > dt["close"]) 
                | (dt["n" + str(i) + "_close"] > dt["close"])
                , "top"
            ] = 0

        dt = dt.loc[:,originals_columns]

        return dt

    def group_level(self, df, group_multiplier = 1):
        df_test = df.copy()
        d = list(df_test.loc[df_test["bottom"]==1, "close"])
        d.extend(list(df_test.loc[df_test["top"]==1, "close"]))

        d.sort()

        diff = [y - x for x, y in zip(*[iter(d)] * 2)]
        avg = sum(diff) / len(diff)

        important_levels = [[d[0]]]

        for x in d[1:]:
            if x - important_levels[-1][0] < group_multiplier * avg:
                important_levels[-1].append(x)
            else:
                important_levels.append([x])

        return important_levels

    def mean_levels(self, pairSymbol: string, startDate: string, candleMinWindow: int = 3, groupMultiplier: int = 1):
        df = self.get_data_from_api(pairSymbol, startDate)
        df = self.get_top_and_bottom(df, candleMinWindow)
        importantLevels = self.group_level(df, groupMultiplier)

        meanLevels = []

        for levels in importantLevels:
            tot = 0
            for i in range(0, len(levels)):
                tot += levels[i]
            
            meanLevels.append(round(tot / len(levels), 2))

        return meanLevels