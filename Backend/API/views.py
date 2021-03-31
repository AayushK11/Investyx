from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from BackendScripts.dashboard_support import insert_into_spreadsheet

# Create your views here.


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
