import mysql.connector
from mysql.connector.cursor import MySQLCursorNamedTuple

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="database"
)

mycursor = mydb.cursor(prepared=True, cursor_class=MySQLCursorNamedTuple)