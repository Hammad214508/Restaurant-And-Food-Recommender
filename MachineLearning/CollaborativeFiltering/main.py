from load_data import data, ratings_dict
from recommender import algo
import sys

trainingSet = data.build_full_trainset()
algo.fit(trainingSet)

food_ids = set(ratings_dict["item"])

user_id = int(sys.argv[1])
predictions = {}
for food_id in food_ids:
    prediction = algo.predict(user_id, food_id)
    predictions[food_id] = prediction.est

sorted = {k: v for k, v in sorted(predictions.items(), key=lambda item: item[1], reverse=True)}

for food_id, rating in predictions.items():
    print(str(food_id)+ ":", rating)
    
print("Top 5 are:", list(sorted)[:5])

# https://realpython.com/build-recommendation-engine-collaborative-filtering/
#
# Testing:
# # https://towardsdatascience.com/building-and-testing-recommender-systems-with-surprise-step-by-step-d4ba702ef80b
