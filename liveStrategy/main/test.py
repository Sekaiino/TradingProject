import os
from dotenv import load_dotenv
# from utils.spotBinance import Binance
from utils.binanceSpot import Binance
from pprint import pprint

load_dotenv()
API_KEY: str    = os.getenv('API_KEY')
SECRET_KEY: str = os.getenv('API_SECRET')
client = Binance(apiKey=API_KEY, secret= SECRET_KEY)

# pprint(client.market)
balance = client.get_price_of_one_coin("BTCUSDT")
pprint(balance)