import asyncio
import json
import logging
import websockets

logging.basicConfig()

STATE = {}

USERS = set()

def state_event():
    return json.dumps({"type": "recommended_items", **STATE})


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
                print(user_id)
                STATE["recommended"] = {2: 5, 5: 4.851646989425987, 6: 4.677862113322286, 1: 4.347988484214488, 4: 4.299610455239277}
                await notify_state()
            else:
                print("ERROR")
    finally:
        await unregister(websocket)


start_server = websockets.serve(counter, "localhost", 6789)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()