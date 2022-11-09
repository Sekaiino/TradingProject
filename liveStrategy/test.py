from utils.supAndRes import SupportAndResistance
from utils.customIndicators import SuperTrend
from utils.spotFTX import SpotFTX
from datetime import datetime, timedelta
import json
import ta

# To use later to make stop loss and take profit
startDate = (datetime.now() + timedelta(days=-15)).strftime("%d %B %Y").lower();
print(startDate);

sr = SupportAndResistance();

with open("liveStrategy/json/coinconfig.json", 'r') as f:
    paramCoins = json.load(f);

for i in paramCoins.keys():
    print(i);
    pairSymbol = i.replace('-PERP', 'USDT');

    print("===========================================");
    meanLevels = sr.mean_levels(pairSymbol=pairSymbol, startDate=startDate, candleMinWindow=1, groupMultiplier=2);
    print(meanLevels);
    print("\n");