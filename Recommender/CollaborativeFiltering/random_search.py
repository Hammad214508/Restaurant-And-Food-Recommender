from surprise import KNNWithMeans, KNNWithZScore
from surprise import Dataset
from surprise.model_selection import GridSearchCV, RandomizedSearchCV, KFold
# from train import training_data

training_data = Dataset.load_builtin("ml-100k")
sim_options = {
    "name": ["pearson", "msd", "cosine"],
    "min_support": [2, 4, 5],
    "user_based": [False, True],
}

print('\nRUNNING RANDOM SEARCH')
print('   "name": ["pearson", "msd", "cosine"]')
print('   "min_support": [2, 3, 4, 5]')
print('   "user_based": [False, True]\n')


param_grid = {"sim_options": sim_options}
import time
start_time = time.time()
# RandomSearchCV
gs = RandomizedSearchCV(KNNWithZScore, param_grid, measures=["rmse", "mae"], cv=3)
gs.fit(training_data)

print()
print("RMSE:",gs.best_score["rmse"])
print(gs.best_params["rmse"])
print()
print("MAE:",gs.best_score["mae"])
print(gs.best_params["mae"])
print()
print ("Time Taken:", time.time() - start_time)
print()



# OUTPUT:
"""
RUNNING RANDOMSEARCH
   "name": ["pearson", "msd", "cosine"]
   "min_support": [2, 3, 4, 5]
   "user_based": [False, True]

RMSE: 0.9448856255193904
{'sim_options': {'name': 'cosine', 'min_support': 2, 'user_based': True}}

MAE: 0.740020541145296
{'sim_options': {'name': 'cosine', 'min_support': 3, 'user_based': True}}

Time taken: 202.2576858997345
"""