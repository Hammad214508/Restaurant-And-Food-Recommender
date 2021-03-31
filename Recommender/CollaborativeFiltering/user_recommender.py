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
  database="database1"
)

mycursor = mydb.cursor(prepared=True, cursor_class=MySQLCursorNamedTuple)

"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"                       RECOMMENDER                                 "
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

from surprise import KNNBasic, KNNWithMeans, KNNWithZScore, KNNBaseline

# To use user-based cosine similarity
sim_options_user = {
    "name": "cosine",
    "user_based": True,  # Compute  similarities between items
    "min_support": 2,
}

# To use item-based cosine similarity

sim_options_item = {
    "name": "cosine",
    "user_based": False,  # Compute  similarities between items
    "min_support": 2,
}

# - name contains the similarity metric to use. Options are cosine, msd, pearson, or pearson_baseline. The default is msd.
# - user_based is a boolean that tells whether the approach will be user-based or item-based. 
#   The default is True, which means the user-based approach will be used.
# - min_support is the minimum number of common items needed between users to consider them for similarity. 
#   For the item-based approach, this corresponds to the minimum number of common users for two items.


user_based = KNNWithZScore(sim_options=sim_options_user)
item_based = KNNWithZScore(sim_options=sim_options_item)


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
training_user_data = Dataset.load_from_df(df[["user", "item", "rating"]], reader)
trainingSet_user = training_user_data.build_full_trainset()
user_based.fit(trainingSet_user)

training_item_data = Dataset.load_from_df(df[["item", "user", "rating"]], reader)
trainingSet_item = training_item_data.build_full_trainset()
item_based.fit(trainingSet_item)


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"                     USER_BASED FOOD_ITEMS                         "
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

def get_data_to_recommend(parameters):
  if parameters[5] == "true":
    available_query = """AND F.AVAILABLE = %s
                         AND NOW() BETWEEN RES.OPENING_TIME AND RES.CLOSING_TIME"""
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
               
  mycursor.execute(sql, parameters)

  return mycursor.fetchall()


def get_user_food_recommendations(user_id, parameters):
  food_ids = get_data_to_recommend(parameters)
  data = {}
  predictions = {}
  for food_id in food_ids:
      prediction = user_based.predict(user_id, food_id[0])
      predictions[food_id[0]] = prediction.est
      data[food_id[0]] = {  "P_RATING": prediction.est, "ID" : food_id[0], "NAME": food_id[1], 
                            "PRICE": food_id[2], "DIET": food_id[3], "HEALTHY" : food_id[4], 
                            "FILLING": food_id[5], "AVG_RATING": food_id[6], "REST_NAME": food_id[7]}
  sorted_by_preference = [k for k, v in sorted(predictions.items(), key=lambda item: item[1], reverse=True)]
  return data, sorted_by_preference


"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"                     ITEM_BASED FOOD_ITEMS                         "
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

def get_item_based_data():

  sql = """ SELECT  F.FOOD_ID, F.NAME, IM.IMAGE_NAME
            FROM FOOD F 
            INNER JOIN IMAGES IM ON F.FOOD_ID = IM.ENTITY_ID
            WHERE IM.ENTITY_TYPE = "FOOD"
    
        """
               
  mycursor.execute(sql)

  return mycursor.fetchall()


def get_item_based_to_recommend(user_id):
  food_ids = get_item_based_data()
  data = {}
  predictions = {}
  for food_id in food_ids:
      prediction = item_based.predict(user_id, food_id[0])
      predictions[food_id[0]] = prediction.est
      data[food_id[0]] = {  "P_RATING": prediction.est, "ID" : food_id[0], "NAME": food_id[1], 
                            "IMAGE": food_id[2]}
  sorted_by_preference = [k for k, v in sorted(predictions.items(), key=lambda item: item[1], reverse=True)]
  return data, sorted_by_preference



"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
"                     USER_BASED RESTAURANTS                        "
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

def get_all_restaurants(parameters):
    open_query = ""
    if (parameters[0]):
      open_query = "WHERE NOW() BETWEEN OPENING_TIME AND CLOSING_TIME"
    
    sql = """SELECT  RESTAURANT_ID, NAME, EMAIL, NUMBER, ADDRESS, RATING, OPENING_TIME, CLOSING_TIME
            FROM RESTAURANT """ + open_query
    mycursor.execute(sql)
    return mycursor.fetchall()

def get_restaurant_foods(restaurant_id):
    parameters = (restaurant_id,)
    sql = """
          SELECT FOOD_ID
          FROM FOOD 
          WHERE RESTAURANT_ID = %s
          """
    mycursor.execute(sql, parameters)
    return mycursor.fetchall()

def get_rest_score(user_id, rest_foods):
    predictions = {}
    for food in rest_foods:
        prediction = user_based.predict(user_id, food[0])
        predictions[food[0]] = prediction.est
    sorted_ratings = [v for k, v in sorted(predictions.items(), key=lambda item: item[1], reverse=True)]
    if sorted_ratings:
        return sum(sorted_ratings[:3])/len(sorted_ratings[:3])
    return 2.5


def get_user_restaurant_recommendations(user_id, parameters):
    restaurant_ids = get_all_restaurants(parameters)
    rest_scores = {}    
    data = {}
    for rest in restaurant_ids:
        rest_foods = get_restaurant_foods(rest[0])
        rest_scores[rest[0]] = get_rest_score(user_id, rest_foods)
        data[rest[0]] = { "P_RATING" :rest_scores[rest[0]], "RESTAURANT_ID" : rest[0], "NAME" : rest[1], 
                          "EMAIL": rest[2], "NUMBER": rest[3], "ADDRESS": rest[4], "RATING": rest[5],
                          "OPENING_TIME": str(rest[6]), "CLOSING_TIME": str(rest[7])
                        }
    sorted_ratings = [k for k, v in sorted(rest_scores.items(), key=lambda item: item[1], reverse=True)]
    return data, sorted_ratings


# https://realpython.com/build-recommendation-engine-collaborative-filtering/
#
# Testing:
# # https://towardsdatascience.com/building-and-testing-recommender-systems-with-surprise-step-by-step-d4ba702ef80b
