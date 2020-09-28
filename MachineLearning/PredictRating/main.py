from load_data import data
from recommender import algo
trainingSet = data.build_full_trainset()
algo.fit(trainingSet)
prediction = algo.predict(1, 10)
print(prediction.est)
# https://towardsdatascience.com/building-and-testing-recommender-systems-with-surprise-step-by-step-d4ba702ef80b
