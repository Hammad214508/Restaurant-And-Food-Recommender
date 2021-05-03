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
"                       GROUP RECOMMENDER                           "
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

# Function to retrieve the information for all the restaurants from the database
def get_all_restaurants():
    sql = """SELECT  RESTAURANT_ID, NAME, EMAIL, NUMBER, ADDRESS, RATING, OPENING_TIME, CLOSING_TIME FROM RESTAURANT"""
    mycursor.execute(sql)
    return mycursor.fetchall()

# Function to retrieve all the food items for a specific restaurant
def get_restaurant_foods(restaurant_id):
    parameters = (restaurant_id,)
    sql = """
          SELECT FOOD_ID
          FROM FOOD
          WHERE RESTAURANT_ID = %s
          """
    mycursor.execute(sql, parameters)
    return mycursor.fetchall()

# Get the score a user would have for a restaurant
def get_user_score(user_id, rest_foods):
    predictions = {}
    for food in rest_foods:
        prediction = algo.predict(user_id, food[0])
        predictions[food[0]] = prediction.est
    sorted_ratings = [v for k, v in sorted(predictions.items(), key=lambda item: item[1], reverse=True)]
    if sorted_ratings:
        return sum(sorted_ratings[:3])/len(sorted_ratings[:3])
    return 2.5

# Main function  being called by the websocket when it gets a requests
# from the client and it returns the recommended restaurants for all the
# users
def get_recommended_restaurants(users):
    restaurant_ids = get_all_restaurants()
    rest_scores = {}
    data = {}
    for rest in restaurant_ids:
        rest_score = 0
        rest_foods = get_restaurant_foods(rest[0])
        for user_id in users:
            rest_score += get_user_score(user_id, rest_foods)
        rest_scores[rest[0]] = rest_score
        data[rest[0]] = { "P_RATING" :rest_score, "RESTAURANT_ID" : rest[0], "NAME" : rest[1],
                          "EMAIL": rest[2], "NUMBER": rest[3], "ADDRESS": rest[4], "RATING": rest[5],
                          "OPENING_TIME": str(rest[6]), "CLOSING_TIME": str(rest[7])
                        }
    sorted_ratings = [k for k, v in sorted(rest_scores.items(), key=lambda item: item[1], reverse=True)]
    return data, sorted_ratings

# https://realpython.com/build-recommendation-engine-collaborative-filtering/
