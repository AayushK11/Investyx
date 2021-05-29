import os
import warnings

warnings.filterwarnings("ignore")
os.environ["NO_PROXY"] = "127.0.0.1"
from nsepy import get_history
from datetime import datetime
from dateutil.relativedelta import *
import json
import numpy as np
import requests


def start_prediction(symbol, news):
    try:
        url = "http://127.0.0.1:8000/MachineLearningCall/ML/?StockCode={}&News={}".format(
            symbol, news
        )
        response = requests.get(url)

        json_values = json.loads(response.text)
        print(json_values["Score"], json_values["Sentiment"], json_values["Price"])
        return json_values["Score"], json_values["Sentiment"], json_values["Price"]

    except requests.exceptions.ConnectionError:
        print("Local Server is not on")
    except json.decoder.JSONDecodeError:
        print("Server Error")


start_prediction("PNB", ["PNB best"])

