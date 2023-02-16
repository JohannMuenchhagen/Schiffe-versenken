class Ship:
    def __init__(self, start_pos: tuple, end_pos: tuple):
        self.start_pos = start_pos
        self.end_pos = end_pos


class Battleship(Ship):
    def __init__(self, start_pos: tuple, end_pos: tuple):
        Ship.__init__(start_pos=start_pos, end_pos=end_pos)
        self.length = 5


class Corvettes(Ship):
    def __init__(self, start_pos: tuple, end_pos: tuple):
        Ship.__init__(start_pos=start_pos, end_pos=end_pos)
        self.length = 4


class Destroyer(Ship):
    def __init__(self, start_pos: tuple, end_pos: tuple):
        Ship.__init__(start_pos=start_pos, end_pos=end_pos)
        self.length = 3


class Submarine(Ship):
    def __init__(self, start_pos: tuple, end_pos: tuple):
        Ship.__init__(start_pos=start_pos, end_pos=end_pos)
        self.length = 2
