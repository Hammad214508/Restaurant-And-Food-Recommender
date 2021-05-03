from surprise import KNNWithMeans, KNNWithZScore
from surprise import Dataset
from surprise.model_selection import GridSearchCV, RandomizedSearchCV, KFold
from surprise.model_selection import cross_validate

data = Dataset.load_builtin("ml-100k")

# Change the parameters here to cross-validated
sim_options = {
    "name": "cosine",
    "min_support": 2,
    "user_based": False,
}

print()
algo = KNNWithZScore(sim_options=sim_options)
cross_validate(algo, data, measures=['RMSE', 'MAE'], cv=10, verbose=True)
print()
