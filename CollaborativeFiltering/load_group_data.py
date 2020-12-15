from database import mycursor
# from surprise import Dataset
# from surprise import Reader
# import pandas as pd

users = ["1", "2", "3"]
sql = """SELECT RESTAURANT_ID FROM RESTAURANT"""
mycursor.execute(sql)
restaurant_ids = mycursor.fetchall()
rest_scores = {}
for r_id in restaurant_ids:
    parameters = str(r_id[0])
    sql = """SELECT DISTINCT R.FOOD_ID
             FROM RATINGS R 
                INNER JOIN FOOD F ON R.FOOD_ID = F.FOOD_ID
                INNER JOIN RESTAURANT RES ON F.RESTAURANT_ID = RES.RESTAURANT_ID
             WHERE 
                F.AVAILABLE = %s
                """+diet_type_query+"""
                """
                # AND NOW() BETWEEN RES.OPENING_TIME AND RES.CLOSING_TIME  mycursor.execute(sql, parameters)
    ret_foods = mycursor.fetchall()
