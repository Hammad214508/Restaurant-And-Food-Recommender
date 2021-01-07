import pandas as pd
import sys

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"                             DATABASE                              "
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

import mysql.connector
from mysql.connector.cursor import MySQLCursorNamedTuple

mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="database"
)

mycursor = mydb.cursor(prepared=True, cursor_class=MySQLCursorNamedTuple)

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"                       RECOMMENDER                                 "
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

from surprise import KNNBasic, KNNWithMeans, KNNWithZScore, KNNBaseline

# To use item-based cosine similarity
sim_options = {
    "name": "cosine",
    "user_based": False,  # Compute  similarities between items
}

# name contains the similarity metric to use. Options are cosine, msd, pearson, or pearson_baseline. The default is msd.
# user_based is a boolean that tells whether the approach will be user-based or item-based. The default is True, which means the user-based approach will be used.
# min_support is the minimum number of common items needed between users to consider them for similarity. For the item-based approach, this corresponds to the minimum number of common users for two items.

# FOR THE DUMMY TEST DATA accuracy_check.py gave:
# sim_options = {'name': 'msd',
#                'min_support': 1, 
#                'user_based': True}

algo = KNNWithZScore(sim_options=sim_options)
# KNNBasic
# KNNWithZScore 
# KNNBaseline
# KNNWithMeans


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"                           TRAIN                                   "
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

from surprise import Dataset
from surprise import Reader
# from recommender import algo

sql = """SELECT USER_ID, FOOD_ID, RATING FROM RATINGS"""
mycursor.execute(sql)

all_ratings = mycursor.fetchall()

user_ids = [i[0] for i in all_ratings]
food_ids = [i[1] for i in all_ratings]
ratings = [i[2] for i in all_ratings]

ratings_dict = {
    "user"  : user_ids,
    "item"  : food_ids,
    "rating": ratings,
}

df = pd.DataFrame(ratings_dict)
reader = Reader(rating_scale=(1, 5))

# Loads Pandas dataframe
training_data = Dataset.load_from_df(df[["user", "item", "rating"]], reader)

trainingSet = training_data.build_full_trainset()
algo.fit(trainingSet)

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"                COLLABORATIVE FILTERING                            "
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

def get_data_to_recommend(parameters):
  if parameters[5] == "true":
    available_query = "AND F.AVAILABLE = %s"
  else:
    parameters = parameters[:-1]
    available_query = ""

  sql = """ SELECT DISTINCT F.FOOD_ID, F.NAME, F.PRICE, F.DIET_TYPE, F.HEALTHY_RATING, F.FILLING_RATING,
                  F.AVG_RATING, RES.NAME AS RESTAURANT_NAME
            FROM RATINGS R 
                INNER JOIN FOOD F ON R.FOOD_ID = F.FOOD_ID
                INNER JOIN RESTAURANT RES ON F.RESTAURANT_ID = RES.RESTAURANT_ID
            WHERE 
               F.DIET_TYPE >= %s
               AND F.HEALTHY_RATING BETWEEN %s AND %s
               AND F.FILLING_RATING BETWEEN %s AND %s
               """+available_query+"""
               """
                # AND NOW() BETWEEN RES.OPENING_TIME AND RES.CLOSING_TIME

  mycursor.execute(sql, parameters)

  return mycursor.fetchall()


def get_user_recommendations(user_id, parameters):
  food_ids = get_data_to_recommend(parameters)
  data = {}
  predictions = {}
  for food_id in food_ids:
      prediction = algo.predict(user_id, food_id[0])
      predictions[food_id[0]] = prediction.est
      data[food_id[0]] = {  "A": prediction.est, "ID" : food_id[0], "NAME": food_id[1], "PRICE": food_id[2], 
                            "DIET": food_id[3], "HEALTHY" : food_id[4], "FILLING": food_id[5], 
                            "AVG_RATING": food_id[6], "REST_NAME": food_id[7]}
  all_data = {k: v for k, v in data.items()}
  sorted_by_preference = [k for k, v in sorted(predictions.items(), key=lambda item: item[1], reverse=True)]
  return all_data, sorted_by_preference



# https://realpython.com/build-recommendation-engine-collaborative-filtering/
#
# Testing:
# # https://towardsdatascience.com/building-and-testing-recommender-systems-with-surprise-step-by-step-d4ba702ef80b
