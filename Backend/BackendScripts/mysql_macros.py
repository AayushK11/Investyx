import BackendScripts.mysql_commands as commands
import BackendScripts.mysql_details as Credentials
import mysql.connector


def check_database(database):
    mydb = mysql.connector.connect(
        host=Credentials.HOST,
        user=Credentials.USERNAME,
        password=Credentials.PASSWORD,
        auth_plugin="mysql_native_password",
    )
    mycursor = mydb.cursor()
    mycursor.execute(commands.SHOW_DATABASES)

    databases = [x[0].lower() for x in list(mycursor)]
    if database.lower() in databases:
        return
    else:
        create_database(database)


def create_database(database):
    print("--->Creating {}".format(database))
    mydb = mysql.connector.connect(
        host=Credentials.HOST, user=Credentials.USERNAME, password=Credentials.PASSWORD
    )
    mycursor = mydb.cursor()
    mycursor.execute(commands.CREATE_DATABASE.format(database))


def check_table(usercode, database):
    mydb = mysql.connector.connect(
        host=Credentials.HOST,
        user=Credentials.USERNAME,
        password=Credentials.PASSWORD,
        database=database,
    )

    mycursor = mydb.cursor()
    mycursor.execute(commands.SHOW_TABLES)

    tables = [x[0].lower() for x in list(mycursor)]
    if usercode.lower() in tables:
        return
    else:
        create_table(usercode, database)


def create_table(usercode, database):
    mydb = mysql.connector.connect(
        host=Credentials.HOST,
        user=Credentials.USERNAME,
        password=Credentials.PASSWORD,
        database=database,
    )

    mycursor = mydb.cursor()

    if database == "DashboardCards":
        mycursor.execute(commands.CREATE_DASHBOARD_CARDS_TABLE.format(usercode))
        insert_into_table(
            usercode=usercode, stockcode="Nifty 50", exchange="NSE", database=database
        )
        insert_into_table(
            usercode=usercode, stockcode="Sensex", exchange="BSE", database=database
        )
        insert_into_table(
            usercode=usercode, stockcode="Nifty Bank", exchange="NSE", database=database
        )
        insert_into_table(
            usercode=usercode, stockcode="Nifty 100", exchange="NSE", database=database
        )


def insert_into_table(
    usercode, stockcode, exchange, database, industry=None, company=None
):
    mydb = mysql.connector.connect(
        host=Credentials.HOST,
        user=Credentials.USERNAME,
        password=Credentials.PASSWORD,
        database=database,
    )

    mycursor = mydb.cursor()

    if database == "DashboardCards":
        mycursor.execute(
            "insert into {} values ('{}', '{}');".format(usercode, stockcode, exchange)
        )
    mydb.commit()


def delete_from_table(usercode, stockcode, exchange, database, table):
    mydb = mysql.connector.connect(
        host=Credentials.HOST,
        user=Credentials.USERNAME,
        password=Credentials.PASSWORD,
        database=database,
    )

    mycursor = mydb.cursor()

    if table == "DashboardCards":
        mycursor.execute(
            commands.DELETE_DASHBOARD_CARDS_TABLE.format(usercode, stockcode, exchange)
        )
    mydb.commit()
