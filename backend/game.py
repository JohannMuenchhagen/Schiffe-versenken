from player import Player
from ships import *


class Game:
    def __init__(self, game_id):
        self.game_id = game_id
        self.player1 = Player()
        self.player2 = Player()
        self.player1_ships = []
        self.player2_ships = []
        self.player1_ships_set = {'Battleship': 0, 'Corvettes': 0, 'Destroyer': 0, 'Submarine': 0}
        self.player2_ships_set = {'Battleship': 0, 'Corvettes': 0, 'Destroyer': 0, 'Submarine': 0}
        self.player1_moves = []
        self.player2_moves = []
        self.current_player = 1

    def set_player(self, websocket) -> dict:
        if self.current_player == 1:
            self.player1.gameID = self.game_id
            self.player1.playerID = 1
            self.player1.websocket = websocket
            self.current_player = 2
            return {'Status': 'Player 1 initialized'}
        else:
            self.player2.gameID = self.game_id
            self.player2.playerID = 2
            self.player2.websocket = websocket
            return {'Status': 'Player 2 initialized'}

    def check_move(self, player_id: int, move: tuple) -> bool:
        if player_id != self.current_player:  # check if the correct player plays the move
            return False
        elif self.current_player == 1:
            if move in self.player1_moves:  # check if the move is already played
                return False
            else:
                return True
        else:
            if move in self.player2_moves:
                return False
            else:
                return True

    def set_ships(self, player_id: int, ship_type: str, ship_start_pos: tuple, ship_end_pos: int) -> str:
        if player_id == 1:
            pass
        else:
            pass
