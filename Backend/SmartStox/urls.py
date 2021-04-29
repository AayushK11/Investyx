from django.urls import path
from SmartStox import views

urlpatterns = [
    path("login/", views.login),
    path("userdetails/", views.userdetails),
    path("dashboardcards/", views.dashboardcards),
    path("dashboardnews/", views.dashboardnews),
    path("dashboardmood/", views.dashboardmood),
    path("dashboardactive/", views.dashboardactive),
    path("searchbar/", views.searchbar),
    path("stockinfocard/", views.stockinfocard),
]
