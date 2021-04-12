from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from API.models import Authentication
from BackendScripts.authentication_tasks import hash_details
from BackendScripts.email_tasks import smart_stox_email, account_blocked
from PIL import Image

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

    if len(request.data.keys()) == 2 and request.data["Requirement"] == "UserImage":

        UserImage = Authentication.objects.get(
            Usercode=request.data["Usercode"]
        ).UserImage

        if str(UserImage) == "":
            return Response({"Status": "No Image"})

        else:
            print(UserImage.url)
            return Response({"Status": "Success", "UserImage": UserImage.url})
