from django.db import models

# Create your models here.
class Authentication(models.Model):

    UserImage = models.ImageField(upload_to="UserImages", null=True, blank=True)

    FirstName = models.CharField(max_length=15)
    LastName = models.CharField(max_length=15)
    EmailID = models.EmailField(max_length=30)
    DateOfBirth = models.DateField()
    PhoneNumber = models.CharField(max_length=10)
    Address = models.TextField()
    State = models.CharField(max_length=25)
    Country = models.CharField(max_length=25)
    PinCode = models.CharField(max_length=6)

    Username = models.CharField(max_length=32)
    Password = models.CharField(max_length=32)
    Usercode = models.CharField(max_length=6, primary_key=True)
    Pin = models.CharField(max_length=32)

    PanNumber = models.CharField(max_length=32)
    AadharNumber = models.CharField(max_length=32)
    Bank = models.CharField(max_length=25)
    AccountType = models.CharField(max_length=20)
    AccountNumber = models.CharField(max_length=32)
    IFSCCode = models.CharField(max_length=32)
    BankAddress = models.TextField()

    Plan = models.IntegerField()
    TermsAndConditions = models.BooleanField()
    PrivacyPolicy = models.BooleanField()
    MarketRisk = models.BooleanField()

    PaymentDueDate = models.DateField(null=True, blank=True)
    Notifications = models.TextField(null=True, blank=True)

    SmartStox = models.BooleanField(default=False)

    AccountActive = models.BooleanField(default=True)
