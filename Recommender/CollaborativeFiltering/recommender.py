from surprise import KNNBasic, KNNWithMeans, KNNWithZScore, KNNBaseline

# To use item-based cosine similarity
sim_options = {
    "name": "cosine",
    "user_based": False,  # Compute  similarities between items
}

# name contains the similarity metric to use. Options are cosine, msd, pearson, or pearson_baseline. The default is msd.
# user_based is a boolean that tells whether the approach will be user-based or item-based. The default is True, which means the user-based approach will be used.
# min_support is the minimum number of common items needed between users to consider them for similarity. For the item-based approach, this corresponds to the minimum number of common users for two items.

algo = KNNWithZScore(sim_options=sim_options)
# KNNBasic
# KNNWithZScore
# KNNBaseline
# KNNWithMeans
