from player import Player
from ships import *


class Game:
    def __init__(self, game_id):
        self.game_id = game_id
        self.player1 = Player()
        self.player2 = Player()
        self.player1_ships = [[], [], [], []]
        self.player2_ships = [[], [], [], []]
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

    def check_placed_ship(self, player_id: int, ship_type: str) -> bool:
        match ship_type:
            case 'Battleship':
                if player_id == 1 and self.player1_ships_set[ship_type] == 1:
                    return False
                elif player_id == 2 and self.player2_ships_set[ship_type] == 1:
                    return False
                else:
                    return True
            case 'Corvettes':
                if player_id == 1 and self.player1_ships_set[ship_type] == 2:
                    return False
                elif player_id == 2 and self.player2_ships_set[ship_type] == 2:
                    return False
                else:
                    return True
            case 'Destroyer':
                if player_id == 1 and self.player1_ships_set[ship_type] == 3:
                    return False
                elif player_id == 2 and self.player2_ships_set[ship_type] == 3:
                    return False
                else:
                    return True
            case 'Submarine':
                if player_id == 1 and self.player1_ships_set[ship_type] == 4:
                    return False
                elif player_id == 2 and self.player2_ships_set[ship_type] == 4:
                    return False
                else:
                    return True

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

    def set_ships(self, player_id: int, ship_type: str, ship_start_pos: tuple, ship_end_pos: tuple) -> dict:
        if not self.check_placed_ship(player_id=player_id, ship_type=ship_type):
            return {'Error': 'Max amount already placed'}

        match ship_type:
            case 'Battleship':
                ship = Battleship(start_pos=ship_start_pos, end_pos=ship_end_pos)
                index = 0
                if not ship.check_length(ship.length):
                    return {'Error': 'The ship length does not meet the specification of 5'}
            case 'Corvettes':
                ship = Corvettes(start_pos=ship_start_pos, end_pos=ship_end_pos)
                index = 1
                if not ship.check_length(ship.length):
                    return {'Error': 'The ship length does not meet the specification of 4'}
            case 'Destroyer':
                ship = Destroyer(start_pos=ship_start_pos, end_pos=ship_end_pos)
                index = 2
                if not ship.check_length(ship.length):
                    return {'Error': 'The ship length does not meet the specification of 3'}
            case 'Submarine':
                ship = Submarine(start_pos=ship_start_pos, end_pos=ship_end_pos)
                index = 3
                if not ship.check_length(ship.length):
                    return {'Error': 'The ship length does not meet the specification of 2'}
            case _:
                return {'Error': 'No ship provided'}

        if player_id == 1:
            self.player1_ships_set[ship_type] += 1
            self.player1_ships[index].append(ship.get_positions())
            return {'Message': f'Ship: {ship_type} successfully placed'}
        elif player_id == 2:
            self.player2_ships_set[ship_type] += 1
            self.player2_ships[index].append(ship.get_positions())
            return {'Message': f'Ship: {ship_type} successfully placed'}
        else:
            return {'Error': 'Wrong player id'}
