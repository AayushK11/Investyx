import os
import pandas as pd
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent


def get_BSE_data():
    bse_csv = pd.read_csv(os.path.join(BASE_DIR, "Database//BSE.csv"))
    bse_csv = bse_csv.drop(
        columns=[
            "Issuer Name",
            "Security Code",
            "ISIN No",
            "Group",
            "Status",
            "Face Value",
            "Instrument",
        ]
    )
    bse_csv = bse_csv.rename(
        columns={"Security Id": "Code", "Security Name": "Company"}
    )
    bse_csv["Exchange"] = "BSE"

    return bse_csv


def get_NSE_data():
    nse_csv = pd.read_csv(os.path.join(BASE_DIR, "Database//NSE.csv"))
    nse_csv = nse_csv.drop(
        columns=[
            " SERIES",
            " DATE OF LISTING",
            " PAID UP VALUE",
            " MARKET LOT",
            " ISIN NUMBER",
            " FACE VALUE",
        ]
    )
    nse_csv = nse_csv.rename(columns={"SYMBOL": "Code", "NAME OF COMPANY": "Company"})
    nse_csv["Exchange"] = "NSE"

    return nse_csv


def clean_data(joint_csv):
    for i in range(len(joint_csv) - 1):
        if joint_csv.loc[i, "Code"] == joint_csv.loc[i + 1, "Code"]:
            if joint_csv.loc[i, "Exchange"] == "BSE":
                joint_csv.loc[i, "Company"] = joint_csv.loc[i + 1, "Company"]
                joint_csv.loc[i + 1, "Industry"] = joint_csv.loc[i, "Industry"]
            elif joint_csv.loc[i, "Exchange"] == "NSE":
                joint_csv.loc[i + 1, "Company"] = joint_csv.loc[i, "Company"]
                joint_csv.loc[i, "Industry"] = joint_csv.loc[i + 1, "Industry"]
    return joint_csv


def join_dataframes(bse, nse):
    joint_csv = bse.append(nse)
    joint_csv = joint_csv.sort_values("Code")
    joint_csv = joint_csv.reset_index(drop=True)
    joint_csv = clean_data(joint_csv)
    return joint_csv


def list_of_stocks():
    bse_csv = get_BSE_data()
    nse_csv = get_NSE_data()

    combined_eq_csv = join_dataframes(bse_csv, nse_csv)

    combined_eq_csv.to_csv(
        os.path.join(BASE_DIR, "Database//Active Stocks.csv"), index=False
    )

    print("List Compiled")


list_of_stocks()
