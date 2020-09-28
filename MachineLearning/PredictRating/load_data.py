import mysql.connector
import pandas as pd
from surprise import Dataset
from surprise import Reader

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
data = Dataset.load_from_df(df[["user", "item", "rating"]], reader)
