import asyncio
import json
import logging
import websockets
import CollaborativeFiltering.user_recommender as user_recommender
import CollaborativeFiltering.group_recommender as group_recommender

logging.basicConfig()

DATA = {}

USERS = set()

def get_message():
    return json.dumps({"type": "recommended_items", **DATA})

async def send_response(websocket):
    if websocket:  # asyncio.wait doesn't accept an empty list
        message = get_message()
        await websocket.send(message)

async def register(websocket):
    USERS.add(websocket)

async def unregister(websocket):
    USERS.remove(websocket)

def get_parameters_for_recommendation(data):
    diet_type = str(data['diet_type_filter'])
    if "healthy_rating_filter" in data.keys() and data["healthy_rating_filter"]:
        healthy_rating_min = str(float(data["healthy_rating_filter"])-1)
        healthy_rating_max = str(float(data["healthy_rating_filter"])+1)
    else:
        healthy_rating_min = "0"
        healthy_rating_max = "5"
    if "filling_rating_filter" in data.keys() and data["filling_rating_filter"]:
        filling_rating_min = str(float(data["filling_rating_filter"])-1)
        filling_rating_max = str(float(data["filling_rating_filter"])+1)
    else:
        filling_rating_min = "0"
        filling_rating_max = "5"

    available = "true" if data['available'] else "false"
    parameters = (diet_type, healthy_rating_min, healthy_rating_max, filling_rating_min, filling_rating_max, available)
    return parameters

def get_parameters_for_notification(data):
    return ("connection", data["from_uid"], data["to_uid"], data["message"])


async def handler(websocket, path):
    # register(websocket) sends user_event() to websocket
    await register(websocket)
    try:
        async for message in websocket:
            data = json.loads(message)

            if data["action"] == "user_food_recommender":
                print("    -> REQUEST: FOOD RECOMMENDATIONS FOR USER "+data['user_id'])
                parameters = get_parameters_for_recommendation(data)
                DATA["recommended"] = user_recommender.get_user_food_recommendations(int(data['user_id']), parameters)
                await send_response(websocket)

            elif data["action"] == "item_food_recommender":
                print("    -> REQUEST: ITEM BASED FOOD RECOMMENDATIONS FOR ITEM "+data['food_id'])
                DATA["recommended"] = user_recommender.get_item_based_to_recommend(int(data['food_id']))
                await send_response(websocket)

            elif data["action"] == "user_restaurant_recommender":
                print("    -> REQUEST: RESTAURANT RECOMMENDATIONS FOR USER "+data['user_id'])
                parameters = (data["open"],)
                DATA["recommended"] = user_recommender.get_user_restaurant_recommendations(int(data['user_id']), parameters)
                await send_response(websocket)

            elif data["action"] == "group_recommender":
                print("    -> REQUEST: RESTAURANT RECOMMENDATIONS FOR USERS "+str(data['users']))
                DATA["recommended"]= group_recommender.get_recommended_restaurants(data["users"])
                await send_response(websocket)

            else:
                print("ERROR")
    finally:
        await unregister(websocket)


start_server = websockets.serve(handler, "localhost", 6789)
print("\nCONNECTION SUCCESSFUL\n")
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
