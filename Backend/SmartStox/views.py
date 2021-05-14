from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from API.models import Authentication
from BackendScripts.authentication_tasks import hash_details, days_remaining
from BackendScripts.email_tasks import smart_stox_email, account_blocked
from BackendScripts.extra_scrapes import (
    live_news_scrape,
    live_market_mood_scrape,
    live_active_stocks,
    get_stock_details,
)
from BackendScripts.database_tasks import (
    get_dashboard_cards,
    add_to_watchlist,
    get_watchlist,
)
from BackendScripts.extract_company_predictions import predictive_search
import mysql.connector


# Create your views here.
@api_view(["POST"])
def login(request):

    if len(request.data.keys()) == 2 and "Username" in request.data.keys():

        Username = hash_details(request.data["Username"])
        Password = hash_details(request.data["Password"])

        if Authentication.objects.filter(Username=Username, Password=Password).exists():

            if Authentication.objects.get(Username=Username).AccountActive == True:
                return Response(
                    {
                        "Status": "Success",
                        "Usercode": Authentication.objects.get(
                            Username=Username, Password=Password,
                        ).Usercode,
                    }
                )

            else:
                return Response({"Status": "Blocked"})

        else:
            return Response({"Status": "Failed"})

    if len(request.data.keys()) == 2 and "Usercode" in request.data.keys():

        Pin = hash_details(request.data["Pin"])

        if Authentication.objects.filter(
            Usercode=request.data["Usercode"], Pin=Pin
        ).exists():
            user_details = Authentication.objects.get(Usercode=request.data["Usercode"])

            if user_details.SmartStox == False:
                smart_stox_email(user_details.FirstName, user_details.EmailID)
                user_details.SmartStox = True
                user_details.save()
            return Response({"Status": "Success",})
        else:
            return Response({"Status": "Failed"})

    if len(request.data.keys()) == 1 and "Usercode" in request.data.keys():

        user_details = Authentication.objects.get(Usercode=request.data["Usercode"])

        account_blocked(
            user_details.FirstName, user_details.EmailID, request.data["Usercode"]
        )
        user_details.AccountActive = False
        user_details.save()
        return Response({"Status": "Success",})


@api_view(["POST"])
def userdetails(request):

    try:
        live_plan_check(request.data["Usercode"])

        if (
            len(request.data.keys()) == 2
            and request.data["Requirement"] == "UserImage, Notifications"
        ):
            UserImage = Authentication.objects.get(
                Usercode=request.data["Usercode"]
            ).UserImage
            Notifications = Authentication.objects.get(
                Usercode=request.data["Usercode"]
            ).Notifications

            if str(UserImage) == "" and str(Notifications) == "":

                return Response(
                    {
                        "Status": "Failed",
                        "UserImage": "No Image",
                        "Notifications": "No Notifications",
                    }
                )

            elif str(UserImage) == "" and str(Notifications) != "":

                Notifications = list(str(Notifications).split("$$$"))
                Notifications = Notifications[:-1]

                return Response(
                    {
                        "Status": "Notifications",
                        "UserImage": "No Image",
                        "Notifications": Notifications,
                    }
                )

            elif str(UserImage) != "" and str(Notifications) == "":

                return Response(
                    {
                        "Status": "Image",
                        "UserImage": UserImage.url,
                        "Notifications": "No Notifications",
                    }
                )

            else:

                Notifications = list(str(Notifications).split("$$$"))
                Notifications = Notifications[:-1]

                return Response(
                    {
                        "Status": "Success",
                        "UserImage": UserImage.url,
                        "Notifications": Notifications,
                    }
                )

        if (
            len(request.data.keys()) == 3
            and request.data["Requirement"] == "Clear Notification"
        ):
            user_details = Authentication.objects.get(Usercode=request.data["Usercode"])

            Notifications = user_details.Notifications.replace(
                str(request.data["NotificationValue"] + "$$$"), ""
            )
            user_details.Notifications = Notifications
            user_details.save()

            Notifications = list(str(Notifications).split("$$$"))
            Notifications = Notifications[:-1]

            return Response({"Status": "Success", "Notifications": Notifications})

    except Authentication.DoesNotExist:
        return Response({"Status": "Session Expired"})


def live_plan_check(usercode):

    user_details = Authentication.objects.get(Usercode=usercode)
    LastPaidDate = user_details.PaymentDueDate
    DaysRemaining = days_remaining(LastPaidDate)

    if DaysRemaining == 10:
        if user_details.Notifications is None:
            user_details.Notifications = "Your Monthly Plan Expires in 10 Days$$$"
    if DaysRemaining == 5:
        if "Your Monthly Plan Expires in 5 Days$$$" not in user_details.Notifications:
            user_details.Notifications = (
                user_details.Notifications + "Your Monthly Plan Expires in 5 Days$$$"
            )
    if DaysRemaining == 1:
        if "Your Monthly Plan Expires Tomorrow$$$" not in user_details.Notifications:
            user_details.Notifications = (
                user_details.Notifications + "Your Monthly Plan Expires Tomorrow$$$"
            )

    user_details.save()


@api_view(["POST"])
def dashboardcards(request):

    try:

        if (
            len(request.data.keys()) == 2
            and request.data["Requirement"] == "Dashboard Cards"
        ):

            DashboardCards = get_dashboard_cards(request.data["Usercode"])

            return Response(
                {
                    "Status": "Success",
                    "Card1": DashboardCards[0],
                    "Card2": DashboardCards[1],
                    "Card3": DashboardCards[2],
                    "Card4": DashboardCards[3],
                }
            )

    except Authentication.DoesNotExist:
        return Response({"Status": "Session Expired"})


@api_view(["POST"])
def dashboardnews(request):
    try:

        if (
            len(request.data.keys()) == 1
            and request.data["Requirement"] == "Dashboard News"
        ):

            News = live_news_scrape()

            return Response(
                {
                    "Status": "Success",
                    "News1": News[0],
                    "News2": News[1],
                    "News3": News[2],
                    "News4": News[3],
                    "News5": News[4],
                }
            )

    except Authentication.DoesNotExist:
        return Response({"Status": "Session Expired"})


@api_view(["POST"])
def dashboardmood(request):
    try:

        if (
            len(request.data.keys()) == 1
            and request.data["Requirement"] == "Dashboard Mood"
        ):

            mood = live_market_mood_scrape()

            return Response({"Status": "Success", "Mood": mood})

    except Authentication.DoesNotExist:
        return Response({"Status": "Session Expired"})


@api_view(["POST"])
def dashboardactive(request):
    try:

        if (
            len(request.data.keys()) == 1
            and request.data["Requirement"] == "Dashboard Active"
        ):

            activestocks = live_active_stocks()

            return Response(
                {
                    "Status": "Success",
                    "Active0": activestocks[0],
                    "Active1": activestocks[1],
                    "Active2": activestocks[2],
                    "Active3": activestocks[3],
                    "Active4": activestocks[4],
                }
            )

    except Authentication.DoesNotExist:
        return Response({"Status": "Session Expired"})


@api_view(["POST"])
def searchbar(request):
    try:

        if (
            len(request.data.keys()) == 2
            and request.data["Requirement"] == "Search Words"
        ):

            SearchWords = predictive_search(request.data["SearchQuery"])

            return Response({"Status": "Success", "SearchWords": SearchWords})

    except Authentication.DoesNotExist:
        return Response({"Status": "Session Expired"})


@api_view(["POST"])
def stockinfocard(request):
    try:

        if (
            len(request.data.keys()) == 2
            and request.data["Requirement"] == "Stock Details"
        ):
            inputVal = request.data["InputCode"].split(" - ")

            StockDetails = get_stock_details(inputVal[0], inputVal[2])

            return Response(
                {
                    "Status": "Success",
                    "TopBar": StockDetails[0],
                    "Summary": StockDetails[1],
                    "ChartData": StockDetails[2],
                    "Statistics": StockDetails[3],
                    "Profile": StockDetails[4],
                    "Holders": StockDetails[5],
                }
            )

    except Authentication.DoesNotExist:
        return Response({"Status": "Session Expired"})


@api_view(["POST"])
def addtowatchlist(request):
    try:
        if (
            len(request.data.keys()) == 3
            and request.data["Requirement"] == "Add To Watchlist"
        ):
            inputVal = request.data["StockCode"].split(" - ")
            Plan = Authentication.objects.get(Usercode=request.data["Usercode"]).Plan

            if str(Plan) == "99":
                Plan = 5                
            elif str(Plan) == "249":
                Plan = 10                
            elif str(Plan) == "499":
                Plan = 20                


            response = add_to_watchlist(request.data["Usercode"], inputVal[0], inputVal[2], Plan)

            return Response({"Status": response,})

    except Authentication.DoesNotExist:
        return Response({"Status": "Session Expired"})
    except mysql.connector.errors.IntegrityError:
        return Response({"Status": "Stock Already in Watchlist"})


@api_view(["POST"])
def getwatchlist(request):
    try:
        if len(request.data.keys()) == 2 and request.data["Requirement"] == "Watchlist":
            Watchlist = get_watchlist(request.data["Usercode"])

            return Response({"Status": "Success", "Watchlist": Watchlist})

    except Authentication.DoesNotExist:
        return Response({"Status": "Session Expired"})
    except mysql.connector.errors.IntegrityError:
        return Response({"Status": "Stock Already in Watchlist"})

