from pathlib import Path
import pandas as pd
import os
import gspread
from oauth2client.service_account import ServiceAccountCredentials

BASE_PATH = Path(__file__).resolve().parent.parent


def get_from_spreadsheet():
    try:
        scope = [
            "https://spreadsheets.google.com/feeds",
            "https://www.googleapis.com/auth/spreadsheets",
            "https://www.googleapis.com/auth/drive",
        ]

        creds = ServiceAccountCredentials.from_json_keyfile_name(
            os.path.join(BASE_PATH, "Keys\\client_secret.json"), scope
        )

        client = gspread.authorize(creds)

        sheet = client.open("List Of Stocks").get_worksheet(0)
        records_data = sheet.get_all_records()
        records_df = pd.DataFrame.from_dict(records_data)

        return records_df

    except:
        return "Error"


def predictive_search(value):
    try:
        stock_list = get_from_spreadsheet()
        print(stock_list)

        stock_list = [
            [x.Code, x.Name, x.Industry, x.Exchange]
            for x in stock_list.itertuples()
            if (
                value.lower() == x.Code.lower()[: len(value)]
                or value.lower() == x.Name.lower()[: len(value)]
            )
        ]

        stock_list = sorted(stock_list, key=lambda x: x[3], reverse=True)

        return stock_list[:4]
    except AttributeError:
        return []

