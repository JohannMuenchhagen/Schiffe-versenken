from typing import List
from fastapi import WebSocket
import json

from game import Game


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

    async def broadcast(self, message: json, player1: WebSocket, player2: WebSocket = None):
        await player1.send_json(message)
        if player2 is not None:
            await player2.send_json(message)

    def check_type(self, data: json, websocket: WebSocket):
        data: dict = json.loads(data)
        match data['Type']:
            case 'initialize Game':
                return self.initialize_game(websocket)
            case 'Join':
                if data['GameID'] not in self.current_games:
                    return {'Error': 'Unable to Join', 'Description': 'Game doesnt exist'}
                return self.join(data, websocket)
            case 'Set':
                return self.set(data)
            case 'Move':
                return self.move(data)

    def initialize_game(self, websocket: WebSocket):
        self.active_games += 1
        self.active_player += 1
        game = Game(self.active_games)
        self.current_games[self.active_games] = game
        game.set_player(websocket)
        return {'Message': 'Game successfully initialized', 'GameID': game.game_id,
                           'PlayerID': game.player1.playerID}

    def join(self, data: dict, websocket: WebSocket):
        game_id = data['GameID']
        game = self.current_games[game_id]
        msg = game.set_player(websocket)
        if 'Error' in msg:
            return msg, game.player1.websocket, game.player2.websocket
        self.active_player += 1
        return {'Message': 'Join successful', 'PlayerID': game.player2.playerID}, \
            game.player1.websocket, game.player2.websocket

    def set(self, data: dict):
        game_id = data['GameID']
        player_id = data['PlayerID']
        game = self.current_games[game_id]
        ships = data['Ships']
        success = {}
        error = {}
        for item in ships.keys():
            i = 1
            ship = ships[item]
            for element in ship:
                x_start = element[0][1]
                y_start = element[0][0]
                x_end = element[1][1]
                y_end = element[1][0]
                res = game.set_ships(player_id=player_id, ship_type=item, ship_start_pos=(y_start, x_start),
                                     ship_end_pos=(y_end, x_end))
                if 'Error' in res:
                    error[item + str(i)] = res['Error']
                    i += 1
                else:
                    success[item + str(i)] = res['Message']
                    i += 1
        return {'GameID': game_id, 'Success': success, 'Error': error}, \
            game.player1.websocket, game.player2.websocket

    def move(self, data: dict):
        game_id = data['GameID']
        game = self.current_games[game_id]
        player_id = data['PlayerID']
        y = data['Coordinates'][0]
        x = data['Coordinates'][1]
        res = game.check_move(player_id=player_id, move=(y, x))
        if not res:
            return res, game.player1.websocket, game.player2.websocket
        res = game.check_shot(player_id=player_id, shooting_coordinate=(y, x))
        if 'Win' in game.check_win(game.player2_ships_set).values() and player_id == 1:
            return {'Message': 'Player 1 wins'}, game.player1.websocket, game.player2.websocket
        elif 'Win' in game.check_win(game.player1_ships_set).values() and player_id == 2:
            return {'Message': 'Player 2 wins'}, game.player1.websocket, game.player2.websocket
        else:
            return res, game.player1.websocket, game.player2.websocket
