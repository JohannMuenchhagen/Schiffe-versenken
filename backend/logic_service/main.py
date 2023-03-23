from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import requests
from connectionManager import ConnectionManager, broadcast, send_personal_message,test

app = FastAPI()

manager = ConnectionManager()


@app.on_event("startup")
async def startup_event():
    try:
        url = "http://localhost:8080/game/getgamenumbers"
        res = requests.get(url=url, params={}).json()
        for item in res:
            manager.saved_games.append(int(item))
        print('Server started')
    except Exception as e:
        print(e)  # @TODO reformat
        print('Database not reachable. Server started')


@app.get("/")
async def get():
    return {'message': 'Hello User'}


@app.websocket("/game")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            res = manager.check_type(data, websocket)
            if len(res) > 3 and res[0].type == list:
                await test(res)
            elif len(res) > 3:
                await broadcast(message_player1=res[1], message_player2=res[0], player1=res[2], player2=res[3])
            else:
                await broadcast(message_player1=res[0], message_player2=res[0], player1=res[1], player2=res[2])
    except WebSocketDisconnect:
        opposite = manager.disconnect(websocket)
        if opposite is not None:
            await send_personal_message({'Message':'Player left'}, opposite)
            manager.remove_websocket(opposite)
