from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from API.models import Authentication
from BackendScripts.authentication_tasks import hash_details, days_remaining
from BackendScripts.email_tasks import smart_stox_email, account_blocked
from BackendScripts.indice_scraping import (
    live_nifty_50_data,
    live_sensex_data,
    live_nifty_bank_data,
    live_nifty_100_data,
)
from multiprocessing.pool import ThreadPool

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
                print(Notifications)

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
                print(Notifications)

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
        user_details.Notifications = (
            user_details.Notifications + "Your Monthly Plan Expires in 10 Days$$$"
        )
    if DaysRemaining == 5:
        user_details.Notifications = (
            user_details.Notifications + "Your Monthly Plan Expires in 5 Days$$$"
        )
    if DaysRemaining == 1:
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
            # Get User 4 Card Stocks

            pool = ThreadPool(processes=4)

            Nifty50 = pool.apply_async(live_nifty_50_data).get()
            Sensex = pool.apply_async(live_sensex_data).get()
            NiftyBank = pool.apply_async(live_nifty_bank_data).get()
            Nifty100 = pool.apply_async(live_nifty_100_data).get()

            return Response(
                {
                    "Status": "Success",
                    "Card1": Nifty50,
                    "Card2": Sensex,
                    "Card3": NiftyBank,
                    "Card4": Nifty100,
                }
            )

    except Authentication.DoesNotExist:
        return Response({"Status": "Session Expired"})
