SELECT_ALL = "Select * from {};"
SHOW_TABLES = "Show Tables;"
SHOW_DATABASES = "Show Databases;"
CREATE_DATABASE = "Create Database {};"
CREATE_DASHBOARD_CARDS_TABLE = "Create table {} ( code varchar(50) Not Null Primary Key, exchange varchar(3) Not Null);"
DELETE_DASHBOARD_CARDS_TABLE = "Delete from {} where code='{}' and exchange='{}';"
# COUNT_ROWS_WATCHLIST = "Select Count(code) from {}"