import mysql.connector
from mysql.connector.cursor import MySQLCursorNamedTuple
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
plt.style.use('ggplot')


mydb = mysql.connector.connect(
  host="localhost",
  user="root",
  password="",
  database="movielens"
)

mycursor = mydb.cursor(prepared=True, cursor_class=MySQLCursorNamedTuple)

sql = """SELECT USERID, MOVIEID, RATING FROM RATINGS"""
mycursor.execute(sql)

all_ratings = mycursor.fetchall()

user_ids = [int(i[0]) for i in all_ratings]
item_ids = [int(i[1]) for i in all_ratings]
rating_values = [float(i[2]) for i in all_ratings]

ratings_dict = {
    "userId"  : user_ids,
    "movieId"  : item_ids,
    "rating": rating_values,
}

ratings = pd.DataFrame(ratings_dict)

dftmp = ratings[['movieId','rating']].groupby('movieId').mean()

# Initialize empty list to capture basic stats by gere
rating_stats = []
# Plot general histogram of all ratings
dftmp.hist(bins=25, grid=False, edgecolor='b', figsize=(6,5))
plt.legend(loc=(1.05,0), ncol=2)
plt.xlim(0,5)
plt.xlabel('Food rating')
plt.title('Food ratings histograms')
plt.show()





