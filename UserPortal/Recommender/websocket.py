import asyncio
import json
import logging
import websockets
import CollaborativeFiltering.user_recommender as recommender

logging.basicConfig()

DATA = {}

USERS = set()

def state_event():
    return json.dumps({"type": "recommended_items", **DATA})


async def notify_state():
    if USERS:  # asyncio.wait doesn't accept an empty list
        message = state_event()
        await asyncio.wait([user.send(message) for user in USERS])

async def register(websocket):
    USERS.add(websocket)

async def unregister(websocket):
    USERS.remove(websocket)

async def counter(websocket, path):
    # register(websocket) sends user_event() to websocket
    await register(websocket)
    try:
        await websocket.send(state_event())
        async for message in websocket:
            data = json.loads(message)
            if data["action"] == "recommender":
                user_id = data['user_id']
                available = "true" if data['available'] else "false"
                diet_type = str(data['diet_type_filter'])
                if "healthy_rating_filter" in data.keys():
                    healthy_rating_min = str(int(data["healthy_rating_filter"])-1)
                    healthy_rating_max = str(int(data["healthy_rating_filter"])+1)
                else:
                    healthy_rating_min = "0"
                    healthy_rating_max = "5"
                if "filling_rating_filter" in data.keys():
                    filling_rating_min = str(int(data["filling_rating_filter"])-1)
                    filling_rating_min = str(int(data["filling_rating_filter"])+1)
                else:
                    filling_rating_min = "0"
                    filling_rating_max = "5"
                parameters = (diet_type, healthy_rating_min, healthy_rating_max, filling_rating_min, filling_rating_max, available)
                print(parameters)
                DATA["recommended"] = recommender.get_user_recommendations(int(user_id), parameters)
                DATA["order"] = recommender.get_order_rating()
                print(DATA["recommended"])
                await notify_state()
            else:
                print("ERROR")
    finally:
        await unregister(websocket)


start_server = websockets.serve(counter, "localhost", 6789)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()