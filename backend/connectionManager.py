from typing import List
from fastapi import WebSocket


# TODO refactor ConnectionManager
class ConnectionManager:

    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.active_games: int = 0  # counter of active player
        self.active_player: int = 0  # counter of active games

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)
        self.active_player -= 1
        if self.active_player % 2 == 0:  # if the number of players is equal, after 1 is leaving, remove 1 game
            self.active_games -= 1

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_json(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_json(message)
