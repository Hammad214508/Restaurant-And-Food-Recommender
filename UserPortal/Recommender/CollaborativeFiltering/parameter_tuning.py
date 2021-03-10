from surprise import KNNWithMeans, KNNWithZScore
from surprise import Dataset
from surprise.model_selection import GridSearchCV
from train import training_data

# data = Dataset.load_builtin("ml-100k") Load the movielens dataset
sim_options = {
    "name": ["pearson", "msd", "cosine"],
    "min_support": [1, 2, 4, 5],
    "user_based": [False, True],
}

param_grid = {"sim_options": sim_options}

gs = GridSearchCV(KNNWithZScore, param_grid, measures=["rmse", "mae"], cv=3)
gs.fit(training_data)

print()
print("RMSE:",gs.best_score["rmse"])
print(gs.best_params["rmse"])
print()
print("MAE:",gs.best_score["mae"])
print(gs.best_params["mae"])
print()
