from django.urls import path
from SmartStox import views

urlpatterns = [
    path("login/", views.login),
]
