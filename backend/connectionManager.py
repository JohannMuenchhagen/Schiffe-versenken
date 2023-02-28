from typing import List
from fastapi import WebSocket
import json

from backend.game import Game


# TODO refactor ConnectionManager
class ConnectionManager:

    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.active_games: int = 0  # counter of active player
        self.active_player: int = 0  # counter of active games
        self.current_games = {}  # active dict of active games

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

    def check_type(self, data: json, websocket: WebSocket):
        data: dict = json.loads(data)
        match data['Type']:
            case 'initialize Game':
                return self.initialize_game(websocket)
            case 'Join':
                if data['GameID'] not in self.current_games:
                    return json.dumps({'Error': 'Unable to Join', 'Description': 'Game doesnt exist'})
                return self.join(data, websocket)

    def initialize_game(self, websocket: WebSocket):
        self.active_games += 1
        self.active_player += 1
        game = Game(self.active_games)
        self.current_games[self.active_games] = game
        game.set_player(websocket)
        return json.dumps({'Message': 'Game successfully initialized', 'GameID': game.game_id,
                           'PlayerID': game.player1.playerID})

    def join(self, data: dict, websocket: WebSocket):
        game_id = data['GameID']
        game = self.current_games[game_id]
        msg = game.set_player(websocket)
        if 'Error' in msg:
            return json.dumps(msg)
        self.active_player += 1
        return json.dumps({'Message': 'Join successful', 'PlayerID': game.player2.playerID})
