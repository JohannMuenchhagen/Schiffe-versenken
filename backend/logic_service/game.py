from player import Player
from ships import *
import uuid


class Game:
    def __init__(self, game_id):
        self.game_id = game_id
        self.player1 = Player()
        self.player2 = Player()
        self.player1_ships = [[], [], [], []]  # An Array that contains all coordinates of all ships
        self.player2_ships = [[], [], [], []]  # An Array that contains all coordinates of all ships
        # Number of placed ships
        self.player1_ships_set = {'Battleship': 0, 'Corvettes': 0, 'Destroyer': 0, 'Submarine': 0}
        self.player2_ships_set = {'Battleship': 0, 'Corvettes': 0, 'Destroyer': 0, 'Submarine': 0}
        self.player1_flag = 0  # flag if all ships are placed
        self.player2_flag = 0  # flag if all ships are placed
        #######################
        self.player1_moves = []  # Game history of player 1
        self.player2_moves = []  # Game history of player 2
        self.current_player = 0  # ID off the current player
        self.player_counter = 0  # counter of player used for error detection

    def set_player(self, websocket) -> dict:
        if self.player_counter == 2:
            return {'Error': 'Unable to Join', 'Description': 'Maximum amount of players already reached'}
        elif self.current_player == 0:  # 0 is a dummy
            self.player1.gameID = self.game_id  # match player with game
            self.player1.playerID = uuid.uuid4().hex  # create a random unique id
            self.player1.websocket = websocket  # save websocket
            self.current_player = self.player1.playerID  # replace dummy with player id
            self.player_counter += 1  # increase counter
            return {'Status': 'Player 1 initialized'}
        else:
            self.player2.gameID = self.game_id  # match player with game
            self.player2.playerID = uuid.uuid4().hex  # create a random unique id
            self.player2.websocket = websocket  # save websocket
            self.player_counter += 1  # increase counter
            return {'Status': 'Player 2 initialized'}

    def check_placed_ship(self, player_id: int, ship_type: str) -> bool:
        # check if a ship can be placed or the maximum amount is already reached
        match ship_type:
            case 'Battleship':
                if player_id == self.player1.playerID and self.player1_ships_set[ship_type] == 1:
                    return False  # maximum amount reached
                elif player_id == self.player2.playerID and self.player2_ships_set[ship_type] == 1:
                    return False  # maximum amount reached
                else:
                    return True  # ship can be placed
            case 'Corvettes':
                if player_id == self.player1.playerID and self.player1_ships_set[ship_type] == 2:
                    return False  # maximum amount reached
                elif player_id == self.player2.playerID and self.player2_ships_set[ship_type] == 2:
                    return False  # maximum amount reached
                else:
                    return True  # ship can be placed
            case 'Destroyer':
                if player_id == self.player1.playerID and self.player1_ships_set[ship_type] == 3:
                    return False  # maximum amount reached
                elif player_id == self.player2.playerID and self.player2_ships_set[ship_type] == 3:
                    return False  # maximum amount reached
                else:
                    return True  # ship can be placed
            case 'Submarine':
                if player_id == self.player1.playerID and self.player1_ships_set[ship_type] == 4:
                    return False  # maximum amount reached
                elif player_id == self.player2.playerID and self.player2_ships_set[ship_type] == 4:
                    return False  # maximum amount reached
                else:
                    return True  # ship can be placed

    def check_move(self, player_id: int, move: tuple):
        if self.player1.playerID == player_id and player_id == self.current_player:
            if move in self.player1_moves:  # check if the move is already played
                return {'Error': 'Move already played'}
            else:
                self.player1_moves.append(move)  # add a move to an array
                return True
        elif self.player2.playerID == player_id and player_id == self.current_player:
            if move in self.player2_moves:  # check if the move is already played
                return {'Error': 'Move already played'}
            else:
                self.player2_moves.append(move)  # add a move to an array
                return True
        else:
            return {'Error': 'Wrong player'}  # if a move joins the else statement, it means there is a wrong playerID

    def check_shot(self, player_id: int, shooting_coordinate: tuple,
                   current_player:str,
                   enemy_ships: list ) -> dict:  # check if a
        # ship gets a hit
        mapper = ['Battleship', 'Corvettes', 'Destroyer', 'Submarine']
        for index, ship in enumerate(enemy_ships):
            for ships in ship:
                if shooting_coordinate in ships:
                    ships.remove(shooting_coordinate)
                    if len(ships) == 0:
                        self.remove_ship(player_id, index)
                        return {'Message': 'Destroyed', 'Type': mapper[index]}
                    else:
                        return {'Message': 'Hit'}

        if current_player == self.player2.playerID:
            self.current_player = self.player1.playerID
        else:
            self.current_player = self.player2.playerID
        return {'Message': 'Miss'}

    def set_ships(self, player_id: int, ship_type: str, ship_start_pos: tuple, ship_end_pos: tuple) -> dict:
        if not self.check_placed_ship(player_id=player_id,
                                      ship_type=ship_type):  # check if the maximum amount is placed
            return {'Error': 'Max amount already placed'}

        match ship_type:  # initialize a ship
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

        if player_id == self.player1.playerID:
            self.player1_ships_set[ship_type] += 1  # increase the number of a specific ship type
            self.player1_ships[index].append(ship.get_positions())  # get coordinates of a ship and save it
            self.player1_flag = 1
            return {'Message': f'{ship_type} successfully placed'}
        elif player_id == self.player2.playerID:
            self.player2_ships_set[ship_type] += 1
            self.player2_ships[index].append(ship.get_positions())
            self.player2_flag = 1
            return {'Message': f'{ship_type} successfully placed'}
        else:
            return {'Error': 'Wrong player id'}

    def remove_ship(self, player_id: int, index: int):  # Remove destroyed ships from the Dict
        mapper = ['Battleship', 'Corvettes', 'Destroyer', 'Submarine']
        if player_id == self.player1.playerID:
            self.player2_ships_set[mapper[index]] -= 1
        else:
            self.player1_ships_set[mapper[index]] -= 1

    def check_win(self, ship_set: dict) -> dict:
        for key, value in ship_set.items():
            if value >= 1:
                return {'Message': 'No win'}
        return {'Message': 'Win'}

