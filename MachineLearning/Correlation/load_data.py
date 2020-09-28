import mysql.connector
import numpy as np
import pandas as pd

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="my_database"
)




mycursor = mydb.cursor()
mycursor.execute("""SELECT USER_ID, FOOD_ID, RATING FROM RATINGS""")
myresult = mycursor.fetchall()

user_ids = [i[0] for i in myresult]
food_ids = [i[1] for i in myresult]
ratings = [i[2] for i in myresult]

ratings_dict = {
    "user_id"  : user_ids,
    "item_id"  : food_ids,
    "rating": ratings,
}

df = pd.DataFrame(ratings_dict)




mycursor = mydb.cursor()
mycursor.execute("""SELECT FOOD_ID, NAME FROM FOOD""")
myresult = mycursor.fetchall()
food_ids = [i[0] for i in myresult]
food_names = [i[1] for i in myresult]

food_titles = {
    "item_id"  : food_ids,
    "title" : food_names,
}

food_data = pd.DataFrame(food_titles)


df = pd.merge(df,food_data,on='item_id')
# print(df)
