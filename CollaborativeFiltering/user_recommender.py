from database import mycursor
import pandas as pd
from train import algo
import sys

available = "true"
diet_type = "1" 
diet_type_query = "" if diet_type == "1" else "AND F.DIET_TYPE = %s"
healthy_rating_min = "0"
healthy_rating_max = "5"
filling_rating_min = "0"
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
              """
              # AND NOW() BETWEEN RES.OPENING_TIME AND RES.CLOSING_TIME

mycursor.execute(sql, parameters)

food_ids = mycursor.fetchall()

user_id = int(sys.argv[1])

predictions = {}

for food_id in food_ids:
    prediction = algo.predict(user_id, food_id[0])
    predictions[food_id[0]] = prediction.est

sorted = {k: v for k, v in sorted(predictions.items(), key=lambda item: item[1], reverse=True)}
# print(sorted)

# for food_id, rating in sorted.items():
#     print(str(food_id)+ ":", rating)
    
# print("Top 3 are:", list(sorted)[:3])
print("HELLO")

# https://realpython.com/build-recommendation-engine-collaborative-filtering/
#
# Testing:
# # https://towardsdatascience.com/building-and-testing-recommender-systems-with-surprise-step-by-step-d4ba702ef80b
