from pathlib import Path
import os
import gspread
from oauth2client.service_account import ServiceAccountCredentials

BASE_PATH = Path(__file__).resolve().parent.parent


def insert_into_spreadsheet(name, email, phoneno, issue):
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

        sheet = client.open("Dashboard - Support").sheet1
        values = [name, email, phoneno, issue]
        sheet.append_row(values)
        return "Success"
    except:
        return "Error"
