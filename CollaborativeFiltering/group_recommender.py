from database import mycursor
from train import algo


def get_all_restaurants():
    sql = """SELECT RESTAURANT_ID FROM RESTAURANT"""
    mycursor.execute(sql)
    return mycursor.fetchall()

def get_restaurant_foods(restaurant_id):
    parameters = str(restaurant_id)
    sql = """
          SELECT FOOD_ID
          FROM FOOD 
          WHERE RESTAURANT_ID = %s
          """
    mycursor.execute(sql, parameters)
    return mycursor.fetchall()

def get_user_score(user_id):
    predictions = {}
    for food in ret_foods:
        prediction = algo.predict(user_id, food[0])
        predictions[food[0]] = prediction.est
    sorted_ratings = [v for k, v in sorted(predictions.items(), key=lambda item: item[1], reverse=True)]
    if sorted_ratings:
        return sum(sorted_ratings)/len(sorted_ratings)
    return 2.5

users = [1, 2, 3]

restaurant_ids = get_all_restaurants()
rest_scores = {}    
for r_id in restaurant_ids:
    rest_score = 0
    ret_foods = get_restaurant_foods(r_id[0])
    for user_id in users:
        rest_score += get_user_score(user_id)
    rest_scores[r_id[0]] = rest_score
    
print(rest_scores)
