import hashlib
import random
import string
from datetime import datetime
from dateutil.relativedelta import *


def hash_details(detail):
    return (hashlib.md5(detail.encode())).hexdigest()


def generate_usercode():
    usercode = (
        random.choice(string.ascii_letters).upper()
        + random.choice(string.ascii_letters).upper()
        + str(random.randint(0, 9))
        + str(random.randint(0, 9))
        + str(random.randint(0, 9))
        + str(random.randint(0, 9))
    )
    return usercode


def find_due_date():
    return (datetime.today() + relativedelta(months=+1)).strftime("%Y-%m-%d")


def days_remaining(due_date):
    return (due_date - datetime.today().date()).days

