import requests
from bs4 import BeautifulSoup
import BackendScripts.links as links


def live_news_scrape():
    try:
        response = requests.get(links.STOCKNEWS, timeout=5).content
        parser = BeautifulSoup(response, "html.parser")

        news_list = []
        news = parser.find_all(class_="eachStory")

        for i in range(0, 5):

            news_single = list(news[i].stripped_strings)
            newsImage = news[i].find_all("img")
            newsImage = newsImage[0]["data-original"]

            news_single.append(newsImage)
            news_list.append(news_single)

        return news_list

    except requests.exceptions.ConnectionError:
        return ("Economic Times", 0, 0)
    except requests.exceptions.ReadTimeout:
        return ("Economic TImes", 0, 0)


def live_market_mood_scrape():
    try:
        response = requests.get(links.MARKETMOOD, timeout=5).content
        parser = BeautifulSoup(response, "html.parser")

        mood = parser.find_all(class_="mmi-value")
        mood = float(list(mood[0].stripped_strings)[0])

        return mood

    except requests.exceptions.ConnectionError:
        return ("Ticker Tape", 0)
    except requests.exceptions.ReadTimeout:
        return ("Ticker Tape", 0)


def live_active_stocks():
    try:
        response = requests.get(links.ACTIVESTOCKS, timeout=5).content
        parser = BeautifulSoup(response, "html.parser")

        active_list = parser.find_all(class_="PR tab-pane in fade active")
        active_list = list(active_list[0].stripped_strings)
        del active_list[:5]
        del active_list[-1]

        active_grouped = []

        for i in range(0, 5):
            active_grouped.append(list(active_list[:4]))
            del active_list[:4]

        return active_grouped

    except requests.exceptions.ConnectionError:
        return ("Money Control", 0, 0, 0)
    except requests.exceptions.ReadTimeout:
        return ("Money Control", 0, 0, 0)


def get_live_price(Code, Exchange):
    if Exchange == "NSE":
        response = requests.get(
            links.LIVE_STOCK_PRICE_NSE.format(Code, Code), timeout=5
        ).content

    elif Exchange == "BSE":
        response = requests.get(
            links.LIVE_STOCK_PRICE_BSE.format(Code, Code), timeout=5
        ).content

    parser = BeautifulSoup(response, "html.parser")

    current_price = parser.find_all(class_="Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(ib)")
    current_price = float(list(current_price[0].stripped_strings)[0])

    previous_close = parser.find_all(class_="Ta(end) Fw(600) Lh(14px)")
    previous_close = float(list(previous_close[0].stripped_strings)[0])

    opening_price = parser.find_all(class_="Ta(end) Fw(600) Lh(14px)")
    opening_price = float(list(opening_price[1].stripped_strings)[0])

    value_change = round(float(current_price - previous_close), 2)

    percentage_change = round(
        ((current_price - previous_close) * 100 / previous_close), 2
    )

    return (
        Code,
        current_price,
        percentage_change,
        value_change,
        opening_price,
        previous_close,
    )


def get_personalised_dashboard_card(Code, Exchange):
    Name, Current, Percentage, ValueChange, _, _ = get_live_price(Code, Exchange)
    return [Name, Current, Percentage, ValueChange]
