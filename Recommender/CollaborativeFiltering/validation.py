from surprise import KNNWithMeans, KNNWithZScore
from surprise import Dataset
from surprise.model_selection import GridSearchCV, RandomizedSearchCV, KFold
from surprise.model_selection import cross_validate

data = Dataset.load_builtin("ml-100k") 

sim_options = {
    "name": "cosine",
    "min_support": 1,
    "user_based": True,
}


algo = KNNWithZScore(sim_options=sim_options)
cross_validate(algo, data, measures=['RMSE', 'MAE'], cv=5, verbose=True)
