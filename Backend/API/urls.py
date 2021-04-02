from django.urls import path
from API import views

urlpatterns = [
    path("support/", views.support),
    path("register/", views.register),
]
