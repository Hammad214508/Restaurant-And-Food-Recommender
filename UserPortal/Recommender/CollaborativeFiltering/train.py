from database import mycursor
from surprise import Dataset
from surprise import Reader
from recommender import algo
import pandas as pd

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

