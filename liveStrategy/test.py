import os
import json
from dotenv import load_dotenv
# from utils.spotBinance import Binance
from utils.binanceSpot import Binance
from pprint import pprint

load_dotenv()
API_KEY: str    = os.getenv('API_KEY')
SECRET_KEY: str = os.getenv('API_SECRET')

client = Binance(apiKey=API_KEY, secret= SECRET_KEY)

result = client.get_historical_since("BTCUSDT", "1h", "1 January 2022")
pprint(result)

client.place_limit_order("BTCUSDT", "BUY", 20, 16500, 1)
print("order created")