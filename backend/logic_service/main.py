from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import requests
from connectionManager import ConnectionManager

app = FastAPI()

manager = ConnectionManager()


@app.on_event("startup")
async def startup_event():
    url = "http://localhost:8080/game/getgamenumbers"
    res = requests.get(url=url, params={}).json()
    for item in res:
        manager.saved_games.append(int(item))
    print('Server started')


@app.get("/")
async def get():
    return {'message': 'Hello User'}


@app.websocket("/game")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_json()
            res, player1, player2 = manager.check_type(data, websocket)
            await manager.broadcast(message=res, player1=player1, player2=player2)
    except WebSocketDisconnect:
        opposite = manager.disconnect(websocket)
        if opposite is not None:
            await manager.send_personal_message('Player left', opposite)
            manager.remove_websocket(opposite)
