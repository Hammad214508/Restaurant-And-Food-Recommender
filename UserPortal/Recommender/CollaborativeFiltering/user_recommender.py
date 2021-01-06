# from database import mycursor
import pandas as pd
# from train import algo
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
  diet_type_query = "" if len(parameters) == 5 else "AND F.DIET_TYPE = %s"

  sql = """ SELECT DISTINCT F.FOOD_ID, F.NAME, F.PRICE, F.DIET_TYPE, F.HEALTHY_RATING, F.FILLING_RATING,
                  F.AVG_RATING, RES.NAME AS RESTAURANT_NAME
            FROM RATINGS R 
                INNER JOIN FOOD F ON R.FOOD_ID = F.FOOD_ID
                INNER JOIN RESTAURANT RES ON F.RESTAURANT_ID = RES.RESTAURANT_ID
            WHERE 
                F.AVAILABLE = %s
                """+diet_type_query+"""
                AND F.HEALTHY_RATING BETWEEN %s AND %s
                AND F.FILLING_RATING BETWEEN %s AND %s
                """
                # AND NOW() BETWEEN RES.OPENING_TIME AND RES.CLOSING_TIME

  mycursor.execute(sql, parameters)

  return mycursor.fetchall()


def get_user_recommendations(user_id, parameters):
  food_ids = get_data_to_recommend(parameters)
  data = {}
  for food_id in food_ids:
      prediction = algo.predict(user_id, food_id[0])
      predictions[food_id[0]] = prediction.est
      data[food_id[0]] = {  "A":prediction.est, "ID" : food_id[0], "NAME": food_id[1], "PRICE": food_id[2], 
                            "DIET": food_id[3], "HEALTHY" : food_id[4], "FILLING": food_id[5], 
                            "AVG_RATING": food_id[6], "REST_NAME": food_id[7]}

  return {k: v for k, v in data.items()}


def get_order_rating():
  return [k for k, v in sorted(predictions.items(), key=lambda item: item[1], reverse=True)]


predictions = {}

# available = "true"
# diet_type = "1" 
# diet_type_query = "" if diet_type == "1" else "AND F.DIET_TYPE = %s"
# healthy_rating_min = "0"
# healthy_rating_max = "5"
# filling_rating_min = "0"
# filling_rating_max = "5"

# parameters = (available, diet_type, healthy_rating_min, healthy_rating_max, filling_rating_min, filling_rating_max)
# if (diet_type_query == ""):
#   parameters = (available, healthy_rating_min, healthy_rating_max, filling_rating_min, filling_rating_max)


# data = get_user_recommendations(1, parameters)
# print(data)
# order =  get_order_rating()
# print(order)


# https://realpython.com/build-recommendation-engine-collaborative-filtering/
#
# Testing:
# # https://towardsdatascience.com/building-and-testing-recommender-systems-with-surprise-step-by-step-d4ba702ef80b
