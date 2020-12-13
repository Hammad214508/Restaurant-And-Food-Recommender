import mysql.connector
import pandas as pd
from surprise import Dataset
from surprise import Reader

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="database"
)

mycursor = mydb.cursor(prepared=True)

mycursor.execute("""SELECT USER_ID, FOOD_ID, RATING FROM RATINGS""")

all_ratings = mycursor.fetchall()

user_ids = [i[0] for i in all_ratings]
food_ids = [i[1] for i in all_ratings]
ratings = [i[2] for i in all_ratings]

# This is the same data that was plotted for similarity earlier
# with one new user "E" who has rated only movie 1
ratings_dict = {
    "user"  : user_ids,
    "item"  : food_ids,
    "rating": ratings,
}

df = pd.DataFrame(ratings_dict)
reader = Reader(rating_scale=(1, 5))

# Loads Pandas dataframe
training_data = Dataset.load_from_df(df[["user", "item", "rating"]], reader)

# https://pynative.com/python-mysql-execute-parameterized-query-using-prepared-statement/


available = "true"
diet_type = "1" 
diet_type_query = "" if diet_type == "1" else "AND F.DIET_TYPE = %s"
healthy_rating_min = "1"
healthy_rating_max = "5"
filling_rating_min = "1"
filling_rating_max = "5"

parameters = (available, diet_type, healthy_rating_min, healthy_rating_max, filling_rating_min, filling_rating_max)
if (diet_type_query == ""):
  parameters = (available, healthy_rating_min, healthy_rating_max, filling_rating_min, filling_rating_max)


sql = """ SELECT DISTINCT R.FOOD_ID
          FROM RATINGS R 
              INNER JOIN FOOD F ON R.FOOD_ID = F.FOOD_ID
              INNER JOIN RESTAURANT RES ON F.RESTAURANT_ID = RES.RESTAURANT_ID
          WHERE 
              F.AVAILABLE = %s
              """+diet_type_query+"""
              AND F.HEALTHY_RATING BETWEEN %s AND %s
              AND F.FILLING_RATING BETWEEN %s AND %s
              AND NOW() BETWEEN RES.OPENING_TIME AND RES.CLOSING_TIME"""


mycursor.execute(sql, parameters)

filtered_food_ids = mycursor.fetchall()

# Loads the builtin Movielens-100k data
# movielens = Dataset.load_builtin('ml-100k')