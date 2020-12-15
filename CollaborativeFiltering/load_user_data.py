from database import mycursor
from surprise import Dataset
from surprise import Reader
import pandas as pd

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

filtered_food_ids = mycursor.fetchall()


# Loads the builtin Movielens-100k data
# movielens = Dataset.load_builtin('ml-100k')