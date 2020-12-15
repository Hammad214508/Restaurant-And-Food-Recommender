import mysql.connector

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="database"
)

mycursor = mydb.cursor(prepared=True)