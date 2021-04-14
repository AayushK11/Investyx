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
            news_list.append(list(news[i].stripped_strings))

        return news_list

    except requests.exceptions.ConnectionError:
        return ("Economic Times", 0, 0, 0)
    except requests.exceptions.ReadTimeout:
        return ("Economic TImes", 0, 0, 0)

