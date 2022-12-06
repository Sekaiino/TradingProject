import os
from dotenv import load_dotenv
# from utils.spotBinance import Binance
from utils.binanceSpot import Binance
from pprint import pprint

load_dotenv()
API_KEY: str    = os.getenv('API_KEY')
SECRET_KEY: str = os.getenv('API_SECRET')
client = Binance(apiKey=API_KEY, secret= SECRET_KEY)

# order = client.place_limit_order("ETHUSDT", "BUY", "LONG", 0.1, 1245.0)
# pprint(order)
order = client.get_open_orders("ETHUSDT")
pprint(order)
order = client.get_open_orders()
pprint(order)