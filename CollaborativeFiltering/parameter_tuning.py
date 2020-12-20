from surprise import KNNWithMeans, KNNWithZScore
from surprise import Dataset
from surprise.model_selection import GridSearchCV
from train import training_data

# data = Dataset.load_builtin("ml-100k")
sim_options = {
    "name": ["msd", "cosine"],
    "min_support": [3, 4, 5],
    "user_based": [False, True],
}

param_grid = {"sim_options": sim_options}

gs = GridSearchCV(KNNWithZScore, param_grid, measures=["rmse", "mae"], cv=3)
gs.fit(training_data)

print(gs.best_score["rmse"])
print(gs.best_params["rmse"])

# 1.6100716388369631
# {'sim_options': {'name': 'msd', 'min_support': 5, 'user_based': False}}
