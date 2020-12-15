from load_user_data import filtered_food_ids as food_ids
from recommender import algo
from train import algo
import sys

# algo = train_algo(training_data)

user_id = int(sys.argv[1])

predictions = {}

for food_id in food_ids:
    prediction = algo.predict(user_id, food_id[0])
    predictions[food_id[0]] = prediction.est

sorted = {k: v for k, v in sorted(predictions.items(), key=lambda item: item[1], reverse=True)}

for food_id, rating in sorted.items():
    print(str(food_id)+ ":", rating)
    
# print("Top 3 are:", list(sorted)[:3])

# https://realpython.com/build-recommendation-engine-collaborative-filtering/
#
# Testing:
# # https://towardsdatascience.com/building-and-testing-recommender-systems-with-surprise-step-by-step-d4ba702ef80b
