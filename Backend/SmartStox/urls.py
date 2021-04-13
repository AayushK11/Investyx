from django.urls import path
from SmartStox import views

urlpatterns = [
    path("login/", views.login),
    path("userdetails/", views.userdetails),
    path("dashboardcards/", views.dashboardcards),
]
