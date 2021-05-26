from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from MachineLearningCall.trainer import start_prediction

# Create your views here.
@api_view(["GET"])
def ml(request):
    stockCode = request.GET.get("Code", "")
    start_prediction(stockCode)
