from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Authentication
from BackendScripts.dashboard_support import insert_into_spreadsheet
from BackendScripts.authentication_tasks import (
    hash_details,
    generate_usercode,
    find_due_date,
)
from BackendScripts.email_tasks import (
    registration_email,
    reset_email,
    forgot_password_email,
)


@api_view(["POST"])
def support(request):
    support_details = request.data["Support"]
    response = insert_into_spreadsheet(
        name=support_details["name"],
        phoneno=support_details["phoneno"],
        email=support_details["emailid"],
        issue=support_details["issue"],
    )
    return Response({"Status": response})


@api_view(["POST"])
def register(request):

    if len(request.data.keys()) == 2 and "Email" in request.data.keys():
        if (
            Authentication.objects.filter(
                PhoneNumber=request.data["PhoneNumber"]
            ).exists()
            or Authentication.objects.filter(EmailID=request.data["Email"]).exists()
        ):
            return Response({"Status": "Failed"})
        else:
            return Response({"Status": "Success"})

    elif len(request.data.keys()) == 1 and "Username" in request.data.keys():
        if Authentication.objects.filter(
            Username=hash_details(request.data["Username"])
        ).exists():
            return Response({"Status": "Failed"})
        else:
            return Response({"Status": "Success"})

    elif len(request.data.keys()) == 3 and "AadharNumber" in request.data.keys():

        print(request.data)

        if (
            Authentication.objects.filter(
                AadharNumber=hash_details(request.data["AadharNumber"])
            ).exists()
            or Authentication.objects.filter(
                PanNumber=hash_details(request.data["PanNumber"])
            ).exists()
            or Authentication.objects.filter(
                AccountNumber=hash_details(request.data["AccountNumber"])
            ).exists()
        ):
            return Response({"Status": "Failed"})
        else:
            return Response({"Status": "Success"})

    elif len(request.data.keys()) == 1 and "UserDetails" in request.data.keys():
        while True:
            usercode = generate_usercode()
            if not Authentication.objects.filter(Usercode=usercode).exists():
                request.data["UserDetails"]["username"] = hash_details(
                    request.data["UserDetails"]["username"]
                )
                request.data["UserDetails"]["password"] = hash_details(
                    request.data["UserDetails"]["password"]
                )
                request.data["UserDetails"]["pannumber"] = hash_details(
                    request.data["UserDetails"]["pannumber"]
                )
                request.data["UserDetails"]["aadharnumber"] = hash_details(
                    request.data["UserDetails"]["aadharnumber"]
                )
                request.data["UserDetails"]["accountnumber"] = hash_details(
                    request.data["UserDetails"]["accountnumber"]
                )
                request.data["UserDetails"]["ifsccode"] = hash_details(
                    request.data["UserDetails"]["ifsccode"]
                )
                paymentduedate = find_due_date()
                Authentication.objects.create(
                    FirstName=request.data["UserDetails"]["firstname"],
                    LastName=request.data["UserDetails"]["lastname"],
                    EmailID=request.data["UserDetails"]["emailid"],
                    DateOfBirth=request.data["UserDetails"]["dateofbirth"],
                    PhoneNumber=request.data["UserDetails"]["phonenumber"],
                    Address=request.data["UserDetails"]["address1"],
                    State=request.data["UserDetails"]["state"],
                    Country=request.data["UserDetails"]["country"],
                    PinCode=request.data["UserDetails"]["pincode"],
                    Username=request.data["UserDetails"]["username"],
                    Password=request.data["UserDetails"]["password"],
                    Usercode=usercode,
                    PanNumber=request.data["UserDetails"]["pannumber"],
                    AadharNumber=request.data["UserDetails"]["aadharnumber"],
                    Bank=request.data["UserDetails"]["bank"],
                    AccountType=request.data["UserDetails"]["accounttype"],
                    AccountNumber=request.data["UserDetails"]["accountnumber"],
                    IFSCCode=request.data["UserDetails"]["ifsccode"],
                    BankAddress=request.data["UserDetails"]["bankaddress1"],
                    Plan=request.data["UserDetails"]["planvalue"],
                    TermsAndConditions=request.data["UserDetails"]["TandC"],
                    PrivacyPolicy=request.data["UserDetails"]["PrivacyPolicy"],
                    MarketRisk=request.data["UserDetails"]["RiskNotice"],
                    PaymentDueDate=paymentduedate,
                )
                registration_email(
                    request.data["UserDetails"]["firstname"],
                    request.data["UserDetails"]["emailid"],
                    usercode,
                )
                break
        return Response({"Status": "Success"})

    elif len(request.data.keys()) == 2 and "Usercode" in request.data.keys():
        if Authentication.objects.filter(Usercode=request.data["Usercode"]).exists():

            user_details = Authentication.objects.get(Usercode=request.data["Usercode"])

            if user_details.Pin == "":
                pin = hash_details(request.data["Pin"])
                user_details.Pin = pin
                user_details.save()
                return Response({"Status": "Success"})
            else:
                return Response({"Status": "Exists"})
        else:
            return Response({"Status": "Failed"})


@api_view(["POST"])
def forgotpassword(request):

    if len(request.data.keys()) == 3 and "PanNumber" in request.data.keys():

        if Authentication.objects.filter(
            Username=hash_details(request.data["Username"]),
            Pin=hash_details(request.data["Pin"]),
            PanNumber=hash_details(request.data["PanNumber"]),
        ).exists():

            user_details = Authentication.objects.get(
                Username=hash_details(request.data["Username"]),
                Pin=hash_details(request.data["Pin"]),
                PanNumber=hash_details(request.data["PanNumber"]),
            )

            forgot_password_email(user_details.FirstName, user_details.EmailID)

            return Response({"Status": "Success"})
        else:
            return Response({"Status": "Failed"})

    if len(request.data.keys()) == 2 and "Username" in request.data.keys():

        if Authentication.objects.filter(
            Username=hash_details(request.data["Username"]),
        ).exists():

            user_details = Authentication.objects.get(
                Username=hash_details(request.data["Username"])
            )

            Password = hash_details(request.data["Password"])
            user_details.Password = Password
            user_details.save()

            reset_email(user_details.FirstName, user_details.EmailID)

            return Response({"Status": "Success"})
        else:
            return Response({"Status": "Failed"})
