import os
import warnings

warnings.filterwarnings("ignore")
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
from nsepy import get_history
from datetime import datetime
from dateutil.relativedelta import *
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, LSTM
from multiprocessing.pool import ThreadPool

# Scraping the Dataset and adding the Date column
def get_dataframe(symbol):
    df = get_history(
        symbol=symbol,
        start=(datetime.today() - relativedelta(months=24)),
        end=datetime.today(),
    )
    df["Date"] = df.index
    return df


# Extracting the Close amount and taking 90% for training
# Scaling the Data to be between 1 and 0 where 1 is the max and 0 is the min
def format_dataset(df):
    try:
        data = df.filter(["Close"])
        dataset = data.values

        scaler = MinMaxScaler(feature_range=(0, 1))
        scaled_data = scaler.fit_transform(dataset)

        return data, scaler, scaled_data

    except ValueError:
        return "Data Not Found", "0", "0", "0"


# Predicting how the values for 5 days affect the next day
# Then popping the first and adding the result
def generate_train(scaled_data):
    try:
        train_data = scaled_data

        xtr = []
        ytr = []
        for i in range(15, len(train_data)):
            xtr.append(train_data[i - 15 : i, 0])
            ytr.append(train_data[i, 0])

        xtr = np.array(xtr)
        ytr = np.array(ytr)

        xtr = np.reshape(xtr, (xtr.shape[0], xtr.shape[1], 1))

        return xtr, ytr
    except IndexError:
        return "Not Enough Data", "0"


# Creating an LSTM Model
def generate_model(xtr, ytr):
    model = Sequential()
    model.add(
        LSTM(units=64, return_sequences=True, input_shape=(xtr.shape[1], xtr.shape[2]))
    )
    model.add(LSTM(units=64, return_sequences=False))
    model.add(Dense(units=16))
    model.add(Dense(units=1))

    model.compile(optimizer="adam", loss="mean_squared_error")

    model.fit(xtr, ytr, batch_size=128, epochs=300, verbose=2)

    return model


def create_predictions(model, scaler, dataset):
    random_pred = dataset[dataset.shape[0] - 15 :]
    random_pred = random_pred["Close"].values
    random_pred = np.reshape(random_pred, (random_pred.shape[0], 1))
    last_minute_transform = scaler.transform(random_pred)

    xpre = []
    xpre.append(last_minute_transform)
    xpre = np.array(xpre)
    xpre = np.reshape(xpre, (xpre.shape[0], xpre.shape[1], 1))

    prediction = model.predict(xpre)
    prediction = scaler.inverse_transform(prediction)

    return round(float(prediction[0][0]), 2)


def analyse_news(news):
    positive_words = [
        "buy",
        "up",
        "rise",
        "jump",
        "strong",
        "support",
        "grow",
        "fold",
        "double",
        "bullish",
        "bull",
        "soar",
        "high",
    ]
    negative_words = [
        "sell",
        "down",
        "dip",
        "hold",
        "bear",
        "bearish",
        "impact",
        "decline",
        "fall",
        "loss",
        "debt",
        "stay away",
        "low",
    ]
    score = 0
    words = 0

    news = news.lower().split(" ")
    for i in news:
        words += 1
        score += positive_words.count(i)
        score -= negative_words.count(i)

    return score, words


def start_sentiment_analysis(news):
    sentiment = []
    score = 0
    words = 0

    for i in news:
        single_score, word = analyse_news(i)
        words += word
        if single_score > 0:
            sentiment.append("Positive")
        if single_score < 0:
            sentiment.append("Negative")
        if single_score == 0:
            sentiment.append("Neutral")
        score += single_score

    score = (((score - (-10)) * (100 - 0)) / (10 - (-10))) + 0

    if len(sentiment) == 0:
        sentiment.append("Neutral")
        sentiment.append("Neutral")
        sentiment.append("Neutral")
        sentiment.append("Neutral")
    if len(sentiment) == 1:
        sentiment.append("Neutral")
        sentiment.append("Neutral")
        sentiment.append("Neutral")
    if len(sentiment) == 2:
        sentiment.append("Neutral")
        sentiment.append("Neutral")
    if len(sentiment) == 3:
        sentiment.append("Neutral")

    return score, sentiment


def start_time_series(symbol):
    df = get_dataframe(symbol)
    dataset, scaler, scaled_data = format_dataset(df)
    if "Data Not Found" in dataset:
        return "Data Not Found"
    else:
        xtr, ytr = generate_train(scaled_data)

        if xtr == "Not Enough Data":
            return "Not Enough Data"
        else:

            model = generate_model(xtr, ytr)

            ypred = create_predictions(model, scaler, dataset)
            return ypred


def start_prediction(symbol, news):
    pool = ThreadPool(processes=2)
    score, sentiment = pool.apply_async(start_sentiment_analysis, args=(news)).get()
    price = pool.apply_async(start_time_series, args=(symbol)).get()

    return score, sentiment, price

