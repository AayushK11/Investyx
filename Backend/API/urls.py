from django.urls import path
from API import views

urlpatterns = [
    path("support/", views.support),
    # path("login-v2/", views.login_v2),
    # path("register/", views.register),
    # path("paymentdetails/", views.payment),
    # path("confirm-account/", views.confirm_account),
    # path("forgot-password/", views.forgot_password),
    # path("reset-password/", views.reset_password),
    # path("live-indices/", views.live_indices),
    # path("user-watchlist/", views.user_watchlist),
    # path("edit-watchlist/", views.edit_watchlist),
]
