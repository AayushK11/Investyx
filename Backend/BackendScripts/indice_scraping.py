import requests
from bs4 import BeautifulSoup
import BackendScripts.links as links


def live_nifty_50_data():
    try:
        response = requests.get(links.NIFTY50, timeout=5).content
        parser = BeautifulSoup(response, "html.parser")

        current_price = parser.find_all(
            class_="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)"
        )
        current_price = float(
            list(current_price[0].stripped_strings)[0].replace(",", "")
        )

        prev_close_price = parser.find_all(class_="Ta(end) Fw(600) Lh(14px)")
        prev_close_price = float(
            list(prev_close_price[0].stripped_strings)[0].replace(",", "")
        )

        return [
            "Nifty 50",
            current_price,
            round(((current_price - prev_close_price) * 100 / prev_close_price), 2),
            round((current_price - prev_close_price), 2),
        ]

    except requests.exceptions.ConnectionError:
        return ("Nifty 50", 0, 0, 0)
    except requests.exceptions.ReadTimeout:
        return ("Nifty 50", 0, 0, 0)


def live_sensex_data():
    try:
        response = requests.get(links.SENSEX, timeout=5).content
        parser = BeautifulSoup(response, "html.parser")

        current_price = parser.find_all(
            class_="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)"
        )
        current_price = float(
            list(current_price[0].stripped_strings)[0].replace(",", "")
        )

        prev_close_price = parser.find_all(class_="Ta(end) Fw(600) Lh(14px)")
        prev_close_price = float(
            list(prev_close_price[0].stripped_strings)[0].replace(",", "")
        )

        return [
            "Sensex",
            current_price,
            round(((current_price - prev_close_price) * 100 / prev_close_price), 2),
            round((current_price - prev_close_price), 2),
        ]

    except requests.exceptions.ConnectionError:
        return ("Sensex", 0, 0, 0)
    except requests.exceptions.ReadTimeout:
        return ("Sensex", 0, 0, 0)


def live_nifty_bank_data():
    try:
        response = requests.get(links.NIFTYBANK, timeout=5).content
        parser = BeautifulSoup(response, "html.parser")

        current_price = parser.find_all(
            class_="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)"
        )
        current_price = float(
            list(current_price[0].stripped_strings)[0].replace(",", "")
        )

        prev_close_price = parser.find_all(class_="Ta(end) Fw(600) Lh(14px)")
        prev_close_price = float(
            list(prev_close_price[0].stripped_strings)[0].replace(",", "")
        )

        return [
            "Nifty Bank",
            current_price,
            round(((current_price - prev_close_price) * 100 / prev_close_price), 2),
            round((current_price - prev_close_price), 2),
        ]

    except requests.exceptions.ConnectionError:
        return ("Nifty Bank", 0, 0, 0)
    except requests.exceptions.ReadTimeout:
        return ("Nifty Bank", 0, 0, 0)


def live_nifty_100_data():
    try:
        response = requests.get(links.NIFTY100, timeout=5).content
        parser = BeautifulSoup(response, "html.parser")

        current_price = parser.find_all(
            class_="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)"
        )
        current_price = float(
            list(current_price[0].stripped_strings)[0].replace(",", "")
        )

        prev_close_price = parser.find_all(class_="Ta(end) Fw(600) Lh(14px)")
        prev_close_price = float(
            list(prev_close_price[0].stripped_strings)[0].replace(",", "")
        )

        return [
            "Nifty 100",
            current_price,
            round(((current_price - prev_close_price) * 100 / prev_close_price), 2),
            round((current_price - prev_close_price), 2),
        ]

    except requests.exceptions.ConnectionError:
        return ("Nifty 100", 0, 0, 0)
    except requests.exceptions.ReadTimeout:
        return ("Nifty 100", 0, 0, 0)


def market_status():
    try:
        response = requests.get(links.YAHOOFIN, timeout=5).content
        parser = BeautifulSoup(response, "html.parser")

        current_status = parser.find_all(
            class_="D(ib) Fl(end) Pb(6px) Fz(xs) Fw(b) fin-update-style"
        )
        current_status = list(current_status[0].stripped_strings)[0]

        if "closed" in current_status:
            return "Closed"
        else:
            return "Open"

    except requests.exceptions.ConnectionError:
        print("-->Yahoo Finance - Connection Error")
        return "Closed"
    except requests.exceptions.ReadTimeout:
        print("-->Yahoo Finance - Read Timeout Error")
        return "Open"
