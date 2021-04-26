import mysql.connector
from mysql.connector.cursor import MySQLCursorNamedTuple
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import math
import statistics
from statistics import mean

plt.style.use('ggplot')


mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="movielens"
)

mycursor = mydb.cursor(prepared=True, cursor_class=MySQLCursorNamedTuple)

# sql = """SELECT USERID, AVG(RATING) AS AVG FROM RATINGS GROUP BY USERID"""
# mycursor.execute(sql)
# avg_ratings = mycursor.fetchall()
# user_avg =  {}
# for avg_rating in avg_ratings:
#     user_avg[avg_rating.USERID] = avg_rating.AVG

sql = """SELECT USERID FROM RATINGS WHERE USERID < 10"""
mycursor.execute(sql)
users = mycursor.fetchall()
users = [user.USERID for user in users]

sql = """SELECT MOVIEID FROM RATINGS WHERE USERID < 10"""
mycursor.execute(sql)
movies = mycursor.fetchall()
movies = [movie.MOVIEID for movie in movies]


user_var = {}
user_avg = {}
for user_id in users:
    sql = """SELECT RATING FROM RATINGS WHERE USERID = %s"""
    mycursor.execute(sql, (user_id,))
    user_ratings = mycursor.fetchall()
    user_ratings = [rating.RATING for rating in user_ratings]

    # sd = 0.00001
    # for rating in user_ratings:        
    #     sd += (rating.RATING - user_avg[user_id])**2
    user_var[user_id] = statistics.stdev(user_ratings)
    user_avg[user_id] = mean(user_ratings)
    
    

sql = "SELECT USERID, MOVIEID, RATING FROM RATINGS WHERE USERID < 10"
mycursor.execute(sql)
all_rating = mycursor.fetchall()
normalised_ratings = []
for rating in all_rating:
    normalised_ratings.append((rating.RATING - user_avg[rating.USERID])/user_var[rating.USERID])

ratings_dict = {
    "userId"  : users,
    "movieId"  : movies,
    "rating": normalised_ratings,
}

ratings = pd.DataFrame(ratings_dict)

dftmp = ratings[['movieId','rating']].groupby('movieId').mean()

# Initialize empty list to capture basic stats by gere
rating_stats = []
# Plot general histogram of all ratings
dftmp.hist(bins=25, grid=False, edgecolor='b', figsize=(6,5))
# plt.legend(loc=(1.05,0), ncol=2)
plt.xlim(0,1)
plt.xlabel('Food rating')
plt.title('Food ratings histograms')
plt.show()





