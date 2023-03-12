from typing import List

import requests
from fastapi import WebSocket
from pydantic import json

from game import Game


def load_game(gameID: int):  # load a game from database
    url = "http://localhost:8080/game/get"
    return requests.get(url, params={"gameId": gameID}).json()


class ConnectionManager:

    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.active_games: int = 0  # counter of active player
        self.active_player: int = 0  # counter of active games
        self.current_games = {}  # active dict of active games
        self.map_websocket_game = {}  # a mapper from websockets to games
        self.saved_games: List[int] = []  # a list of game ids which are saved in the database

    async def connect(self, websocket: WebSocket):  # accept incoming connections
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        game = self.map_websocket_game[websocket]  # find the game
        gameID = game.game_id  # get the game id
        # get both players websockets
        player1 = game.player1.websocket
        player2 = game.player2.websocket
        # self.save_game(gameID)  # save game
        self.current_games.pop(gameID)  # remove game
        if player1 is not websocket:
            self.remove_websocket(websocket)
            return player1  # return the active player
        else:
            self.remove_websocket(websocket)
            return player2  # return the active player

    def remove_websocket(self, websocket: WebSocket):
        self.active_player -= 1  # remove 1 player
        self.map_websocket_game.pop(websocket)  # remove the websocket
        self.active_connections.remove(websocket)  # remove an active connection

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_json({'Message':message})

    async def broadcast(self, message: json, player1: WebSocket, player2: WebSocket = None):
        # send a broadcast to both players
        await player1.send_json(message)
        if player2 is not None:
            await player2.send_json(message)

    def check_type(self, data: json, websocket: WebSocket):
        # the entrypoint to this class
        match data['Type']:
            case 'initialize Game':
                return self.initialize_game(websocket)
            case 'Join':
                if data['GameID'] not in self.current_games.keys():
                    return {'Error': 'Unable to Join', 'Description': 'Game doesnt exist'}
                return self.join(data, websocket)
            case 'Set':
                return self.set(data)
            case 'Move':
                return self.move(data)

    def initialize_game(self, websocket: WebSocket):
        self.active_games += 1  # increase the game id
        while self.active_games in self.saved_games:  # if the game id was already taken
            self.active_games += 1  # increase till a unique id was found

        self.active_player += 1  # increase the number of active players
        game = Game(self.active_games)  # create a new game object
        self.current_games[self.active_games] = game  # save the object in a dict key = id, value game obj
        self.map_websocket_game[websocket] = game  # map of game object and player websocket key = websocket, value game
        game.set_player(websocket)  # save the websocket of player 1 into the game object
        return {'Message': 'Game successfully initialized', 'GameID': game.game_id,
                'PlayerID': game.player1.playerID}, \
            game.player1.websocket, game.player2.websocket

    def join(self, data: dict, websocket: WebSocket):
        game_id = data['GameID']  # read the game id from json
        if game_id in self.saved_games:  # join a saved game
            return self.initialize_previous_game(data, websocket)

        game = self.current_games[game_id]  # load the game out of the dict
        self.map_websocket_game[websocket] = game  # map the game with the websocket key = websocket, value game
        msg = game.set_player(websocket)  # save the websocket of player 2 into the game object
        if 'Error' in msg:
            return msg, game.player1.websocket, game.player2.websocket
        self.active_player += 1  # increase the number of active players
        return {'Message': 'Join successful', 'PlayerID': game.player2.playerID}, \
            game.player1.websocket, game.player2.websocket

    def set(self, data: dict):
        game_id = data['GameID']  # read the game id from json
        player_id = data['PlayerID']  # read the player id from json
        game = self.current_games[game_id]  # load the game from dict
        ships = data['Ships']  # build an object out of the data with key: 'Ships'
        success = {}  # a dict of success returns
        error = {}  # a dict of error returns
        for item in ships.keys():  # for each key in the object
            i = 1  # counter
            ship = ships[item]  # get ship with the Key
            for element in ship:
                # get the coordinates
                x_start = element[0][1]
                y_start = element[0][0]
                x_end = element[1][1]
                y_end = element[1][0]
                # set a ship
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
        game_id = data['GameID']  # read the game id from json
        game = self.current_games[game_id]  # load the game from dict
        player_id = data['PlayerID']  # read the player id from json
        # get coordinates
        y = data['Coordinates'][0]
        x = data['Coordinates'][1]
        # check if the move is already played
        res = game.check_move(player_id=player_id, move=(y, x))
        if not res:  # if the move was already played return an error
            return res, game.player1.websocket, game.player2.websocket
        # check if the shot was a miss, a hit or a kill
        res = game.check_shot(player_id=player_id, shooting_coordinate=(y, x))
        if 'Win' in game.check_win(game.player2_ships_set).values() and player_id == 1:
            return {'Message': 'Player 1 wins'}, game.player1.websocket, game.player2.websocket
        elif 'Win' in game.check_win(game.player1_ships_set).values() and player_id == 2:
            return {'Message': 'Player 2 wins'}, game.player1.websocket, game.player2.websocket
        else:
            return res, game.player1.websocket, game.player2.websocket

    def save_game(self, gameID: int):
        url = "http://localhost:8080/game/save"
        game = self.current_games[gameID]
        self.saved_games.append(gameID)
        player1 = {'Moves': game.player1_moves, 'Ships': game.player1_ships}
        player2 = {'Moves': game.player2_moves, 'Ships': game.player2_ships}
        message = {'spielId': gameID, 'json': {'player1': player1, 'player2': player2}}
        requests.post(url, json=message)  # Post data to database

    def initialize_previous_game(self, data: dict, websocket: WebSocket):
        game_id = data['gameID']
        game = Game(game_id)  # create game object
        game.set_player(websocket)
        self.saved_games.remove(game_id)
        self.current_games[game_id] = game
        self.map_websocket_game[websocket] = game
        self.active_games += 1
        self.active_player += 1
        game.player1_moves = data['player1']['Moves']
        game.player2_moves = data['player2']['Moves']
        self.set(data={'GameID': game_id, 'PlayerID': 1, 'Ships': data['player1']['Ships']})
        self.set(data={'GameID': game_id, 'PlayerID': 2, 'Ships': data['player2']['Ships']})
        return {'Message': 'Game successfully loaded', 'PlayerID': game.player1.playerID}
