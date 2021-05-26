from django.urls import path
from MachineLearningCall import views

urlpatterns = [
    path("ML/", views.ml),
]
