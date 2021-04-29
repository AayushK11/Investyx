import requests
from bs4 import BeautifulSoup

# import BackendScripts.links as links
import links
from nsepy import get_history as nsehistory
from datetime import timedelta, datetime, date


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

    current_price = parser.find_all(class_="D(ib) Mend(20px)")
    current_price = float(list(current_price[0].stripped_strings)[0].replace(",", ""))

    previous_close = parser.find_all(class_="Ta(end) Fw(600) Lh(14px)")
    previous_close = float(list(previous_close[0].stripped_strings)[0].replace(",", ""))

    opening_price = parser.find_all(class_="Ta(end) Fw(600) Lh(14px)")
    opening_price = float(list(opening_price[1].stripped_strings)[0].replace(",", ""))

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


def get_stock_top_bar(Code, Exchange):

    try:
        if Exchange == "NSE":
            response = requests.get(
                links.LIVE_STOCK_PRICE_NSE.format(Code, Code), timeout=5
            ).content
        if Exchange == "BSE":
            response = requests.get(
                links.LIVE_STOCK_PRICE_BSE.format(Code, Code), timeout=5
            ).content

        parser = BeautifulSoup(response, "html.parser")
        commonTag = parser.find_all(class_="D(ib) Va(m) Maw(65%) Ov(h)")

        live_price = list(commonTag[0].stripped_strings)[0]
        value_change = list(commonTag[0].stripped_strings)[1].split(" (")[0]
        percent_change = (
            list(commonTag[0].stripped_strings)[1].split(" (")[1].strip(")")
        )
        live_time = list(commonTag[0].stripped_strings)[2].split(".")[0].split("  ")[1]

        return [live_price, value_change, percent_change, live_time]
    except requests.exceptions.ConnectionError:
        print("Connection Error")
        return []
    except requests.exceptions.ReadTimeout:
        print("Read Timeout Error")
        return []
    except IndexError:
        print("Index Error")
        return []


def get_stock_summary(Code, Exchange):
    try:
        if Exchange == "NSE":
            response = requests.get(
                links.LIVE_STOCK_PRICE_NSE.format(Code, Code), timeout=5
            ).content
        if Exchange == "BSE":
            response = requests.get(
                links.LIVE_STOCK_PRICE_BSE.format(Code, Code), timeout=5
            ).content

        parser = BeautifulSoup(response, "html.parser")
        commonTag = parser.find_all(class_="Ta(end) Fw(600) Lh(14px)")

        previous_close = float(list(commonTag[0].stripped_strings)[0].replace(",", ""))
        opening_price = float(list(commonTag[1].stripped_strings)[0].replace(",", ""))
        days_range = list(commonTag[4].stripped_strings)[0]
        fiftytwo_week_range = list(commonTag[5].stripped_strings)[0]
        volume = list(commonTag[6].stripped_strings)[0]
        ex_dividend_date = list(commonTag[14].stripped_strings)[0]
        market_cap = list(commonTag[8].stripped_strings)[0]
        pe_ratio = list(commonTag[10].stripped_strings)[0]
        earnings_date = list(commonTag[12].stripped_strings)[0]
        forward_dividend = list(commonTag[13].stripped_strings)[0]
        average_volume = list(commonTag[7].stripped_strings)[0]
        oneyr_estimate = list(commonTag[15].stripped_strings)[0]

        return [
            previous_close,
            opening_price,
            days_range,
            fiftytwo_week_range,
            volume,
            ex_dividend_date,
            market_cap,
            pe_ratio,
            earnings_date,
            forward_dividend,
            average_volume,
            oneyr_estimate,
        ]
    except requests.exceptions.ConnectionError:
        print("Connection Error")
        return []
    except requests.exceptions.ReadTimeout:
        print("Read Timeout Error")
        return []
    except IndexError:
        print("Index Error")
        return []


def get_chart_data(Code, Exchange):

    ChartData = []

    try:
        if Exchange == "NSE":
            df = nsehistory(
                symbol=Code,
                start=datetime.now().date() - timedelta(days=1 * 365),
                end=date.today(),
            )
            df["Date"] = df.index
            df.drop(
                columns=[
                    "Series",
                    "VWAP",
                    "Volume",
                    "Turnover",
                    "Trades",
                    "Deliverable Volume",
                    "%Deliverble",
                    "Last",
                    "Symbol",
                    "Prev Close",
                ],
                inplace=True,
            )
            df.reset_index(drop=True, inplace=True)

            for i in df.itertuples():
                if i[4] > i[1]:
                    ChartData.append(
                        [
                            i[5].strftime("%d-%m-%Y"),
                            float(i[3]),
                            float(i[4]),
                            float(i[1]),
                            float(i[2]),
                        ]
                    )
                else:
                    ChartData.append(
                        [
                            i[5].strftime("%d-%m-%Y"),
                            float(i[2]),
                            float(i[4]),
                            float(i[1]),
                            float(i[3]),
                        ]
                    )

            return ChartData

    except requests.exceptions.ConnectionError:
        print("Connection Error")
        return ChartData


def get_stock_statistics(Code, Exchange):
    try:
        if Exchange == "NSE":
            response = requests.get(
                links.LIVE_STOCK_STATS_NSE.format(Code, Code), timeout=5
            ).content
        if Exchange == "BSE":
            response = requests.get(
                links.LIVE_STOCK_STATS_BSE.format(Code, Code), timeout=5
            ).content

        parser = BeautifulSoup(response, "html.parser")
        commonTag = parser.find_all(class_="Fw(500) Ta(end) Pstart(10px) Miw(60px)")

        fiftytwo_week_change = list(commonTag[10].stripped_strings)[0]
        fiftytwo_week_high = list(commonTag[12].stripped_strings)[0]
        fiftytwo_week_low = list(commonTag[13].stripped_strings)[0]
        fifty_day_moving_average = list(commonTag[14].stripped_strings)[0]
        twohundered_day_moving_average = list(commonTag[15].stripped_strings)[0]

        return [
            fiftytwo_week_change,
            fiftytwo_week_high,
            fiftytwo_week_low,
            fifty_day_moving_average,
            twohundered_day_moving_average,
        ]
    except requests.exceptions.ConnectionError:
        print("Connection Error")
        return []
    except requests.exceptions.ReadTimeout:
        print("Read Timeout Error")
        return []
    except IndexError:
        print("Index Error")
        return []


def get_stock_profile(Code, Exchange):
    try:
        if Exchange == "NSE":
            response = requests.get(
                links.LIVE_STOCK_PROFILE_NSE.format(Code, Code), timeout=5
            ).content

        parser = BeautifulSoup(response, "html.parser")
        commonTag = parser.find_all(class_="Pt(10px) smartphone_Pt(20px) Lh(1.7)")

        company_name = list(commonTag[0].stripped_strings)[0]
        company_address = (
            list(commonTag[0].stripped_strings)[1]
            + ", "
            + list(commonTag[0].stripped_strings)[2]
            + ", "
            + list(commonTag[0].stripped_strings)[3]
            + ", "
            + list(commonTag[0].stripped_strings)[4]
        )
        company_phone = list(commonTag[0].stripped_strings)[5]
        company_website = list(commonTag[0].stripped_strings)[6]
        company_sector = list(commonTag[0].stripped_strings)[9]
        company_industry = list(commonTag[0].stripped_strings)[12]
        company_full_time = list(commonTag[0].stripped_strings)[15]

        commonTag = parser.find_all(class_="Mt(15px) Lh(1.6)")
        company_description = list(commonTag[0].stripped_strings)[0]

        return [
            company_name,
            company_address,
            company_phone,
            company_website,
            company_sector,
            company_industry,
            company_full_time,
            company_description,
        ]
    except requests.exceptions.ConnectionError:
        print("Connection Error")
        return []
    except requests.exceptions.ReadTimeout:
        print("Read Timeout Error")
        return []
    except IndexError:
        print("Index Error")
        return []


def get_stock_holders(Code, Exchange):
    try:
        if Exchange == "NSE":
            response = requests.get(
                links.LIVE_STOCK_HOLDERS_NSE.format(Code, Code), timeout=5
            ).content
        if Exchange == "BSE":
            response = requests.get(
                links.LIVE_STOCK_HOLDERS_BSE.format(Code, Code), timeout=5
            ).content

        parser = BeautifulSoup(response, "html.parser")
        commonTag = parser.find_all(class_="Py(10px) Va(m) Fw(600) W(15%)")

        share_insiders = list(commonTag[0].stripped_strings)[0]
        share_institutions = list(commonTag[1].stripped_strings)[0]
        float_institutions = list(commonTag[2].stripped_strings)[0]
        no_of_institutions = list(commonTag[3].stripped_strings)[0]

        return [
            share_insiders,
            share_institutions,
            float_institutions,
            no_of_institutions,
        ]
    except requests.exceptions.ConnectionError:
        print("Connection Error")
        return []
    except requests.exceptions.ReadTimeout:
        print("Read Timeout Error")
        return []
    except IndexError:
        print("Index Error")
        return []


def get_stock_sustainability(Code, Exchange):
    try:
        if Exchange == "NSE":
            response = requests.get(
                links.LIVE_STOCK_SUSTAINABILITY_NSE.format(Code, Code), timeout=5
            ).content
        if Exchange == "BSE":
            response = requests.get(
                links.LIVE_STOCK_SUSTAINABILITY_BSE.format(Code, Code), timeout=5
            ).content

        parser = BeautifulSoup(response, "html.parser")
        commonTag = parser.find_all(class_="smartphone_Pt(20px)")

        ecg_risk_score = list(commonTag[0].stripped_strings)[1]
        ecg_percentile = list(commonTag[0].stripped_strings)[2]
        ecg_level = list(commonTag[0].stripped_strings)[3]
        environmental_risk_score = list(commonTag[0].stripped_strings)[6]
        social_risk_score = list(commonTag[0].stripped_strings)[8]
        governance_risk_score = list(commonTag[0].stripped_strings)[10]

        return [
            ecg_risk_score,
            ecg_percentile,
            ecg_level,
            environmental_risk_score,
            social_risk_score,
            governance_risk_score,
        ]
    except requests.exceptions.ConnectionError:
        print("Connection Error")
        return []
    except requests.exceptions.ReadTimeout:
        print("Read Timeout Error")
        return []
    except IndexError:
        print("Index Error")
        return []


def get_stock_details(Code, Exchange):

    RequiredDetails = []

    RequiredDetails.append(get_stock_top_bar(Code, Exchange))
    RequiredDetails.append(get_stock_summary(Code, Exchange))
    RequiredDetails.append(get_chart_data(Code, Exchange))
    RequiredDetails.append(get_stock_statistics(Code, Exchange))
    RequiredDetails.append(get_stock_profile(Code, Exchange))
    RequiredDetails.append(get_stock_holders(Code, Exchange))
    RequiredDetails.append(get_stock_sustainability(Code, Exchange))

    print(RequiredDetails)


get_stock_details("ADANIPOWER", "NSE")

