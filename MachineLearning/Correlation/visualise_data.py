import matplotlib.pyplot as plt
import seaborn as sns
from load_data import df
import pandas as pd


sns.set_style('white')

# Let's create a ratings dataframe with average rating and number of ratings:

print(df.groupby('title')['rating'].mean().sort_values(ascending=False).head())
print()
print(df.groupby('title')['rating'].count().sort_values(ascending=False).head())


ratings = pd.DataFrame(df.groupby('title')['rating'].mean())
print()
print(ratings.head())
