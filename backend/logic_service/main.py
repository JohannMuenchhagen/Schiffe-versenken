from fastapi import FastAPI, WebSocket, WebSocketDisconnect
import requests
from connectionManager import ConnectionManager

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
            res= manager.check_type(data, websocket)
            if len(res) > 3:
                await  manager.broadcast(message_player1=res[1], messagen_player2=res[0], player1=res[2], player2=res[3])
            else:
                await manager.broadcast(message_player1=res[0], messagen_player2=res[0], player1=res[1], player2=res[2])
    except WebSocketDisconnect:
        opposite = manager.disconnect(websocket)
        if opposite is not None:
            await manager.send_personal_message('Player left', opposite)
            manager.remove_websocket(opposite)

