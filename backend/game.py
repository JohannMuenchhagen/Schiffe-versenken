from player import Player
from ships import *


class Game:
    def __init__(self, game_id):
        self.game_id = game_id
        self.player1 = Player()
        self.player2 = Player()
        self.player1_ships = []
        self.player2_ships = []
        self.player1_moves = []
        self.player2_moves = []
        self.current_player = 1

    def set_player(self, websocket) -> dict:
        if self.current_player == 1:
            self.player1.gameID = self.game_id
            self.player1.playerID = 1
            self.player1.websocket = websocket
            self.current_player = 1
            return {'Status': 'Player 1 initialized'}
        else:
            self.player2.gameID = self.game_id
            self.player2.playerID = 2
            self.player2.websocket = websocket
            return {'Status': 'Player 2 initialized'}
