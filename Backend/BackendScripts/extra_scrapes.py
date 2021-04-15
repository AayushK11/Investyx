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


live_news_scrape()
