from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from MachineLearningCall.trainer import start_prediction

# Create your views here.
@api_view(["GET"])
def ml(request):
    StockCode = request.GET["StockCode"]
    News = request.GET["News"]

    print(StockCode, News)

    News = (
        News.replace("[", "")
        .replace("]", "")
        .replace('"', "")
        .replace("'", "")
        .split(", ")
    )

    score, sentiment, price = start_prediction([StockCode], [News])
    print(score, sentiment, price)

    return Response({"Score": score, "Sentiment": sentiment, "Price": price})

