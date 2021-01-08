import asyncio
import json
import logging
import websockets
import CollaborativeFiltering.user_recommender as recommender
import notifications

logging.basicConfig()

DATA = {}

USERS = set()

def get_message():
    return json.dumps({"type": "recommended_items", **DATA})

async def notify_state(websocket):
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
        filling_rating_min = str(float(data["filling_rating_filter"])+1)
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
            if data["action"] == "recommender":
                parameters = get_parameters_for_recommendation(data)
                DATA["recommended"] = recommender.get_user_recommendations(int(data['user_id']), parameters)
                await notify_state(websocket)
            elif data["action"] == "connection_request":
                parameters = get_parameters_for_notification(data)
                notifications.register_notification(parameters)
            else:
                print("ERROR")
    finally:
        await unregister(websocket)


start_server = websockets.serve(handler, "localhost", 6789)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()