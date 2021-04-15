import BackendScripts.mysql_commands as commands
import BackendScripts.mysql_details as Credentials
from BackendScripts.mysql_macros import (
    check_database,
    check_table,
    # insert_into_table,
    # delete_from_table,
)
from BackendScripts.extra_scrapes import get_personalised_dashboard_card
from BackendScripts.indice_scraping import (
    live_nifty_50_data,
    live_sensex_data,
    live_nifty_bank_data,
    live_nifty_100_data,
)
import mysql.connector
from multiprocessing.pool import ThreadPool


def get_dashboard_cards(Usercode):
    check_database("DashboardCards")
    check_table(Usercode, "DashboardCards")

    mycon = mysql.connector.connect(
        host=Credentials.HOST,
        user=Credentials.USERNAME,
        password=Credentials.PASSWORD,
        database="DashboardCards",
    )

    mycursor = mycon.cursor()
    mycursor.execute(commands.SELECT_ALL.format(Usercode))
    mycursor = list(mycursor)
    stock_details = {}
    stock_list = []

    for stock in mycursor:
        stock_details["Code"] = stock[0]
        stock_details["Exchange"] = stock[1]

        stock_list.append(stock_details)
        stock_details = {}

    pool = ThreadPool(processes=len(stock_list))

    LiveDetails = []

    for i in stock_list:
        if i["Code"] == "Nifty 100":
            LiveDetails.append(pool.apply_async(live_nifty_100_data).get())
        elif i["Code"] == "Nifty 50":
            LiveDetails.append(pool.apply_async(live_nifty_50_data).get())
        elif i["Code"] == "Nifty Bank":
            LiveDetails.append(pool.apply_async(live_nifty_bank_data).get())
        elif i["Code"] == "Sensex":
            LiveDetails.append(pool.apply_async(live_sensex_data).get())
        else:
            LiveDetails.append(
                pool.apply_async(
                    get_personalised_dashboard_card, args=(i["Code"], i["Exchange"]),
                ).get()
            )

    return LiveDetails
