class Ship:
    def __init__(self, start_pos: tuple, end_pos: tuple):
        self.start_pos = start_pos
        self.end_pos = end_pos

    def check_length(self, length: int) -> bool:  # check if the coordinates equals the ship length
        start_y, start_x = self.start_pos
        end_y, end_x = self.end_pos
        if start_x == end_x:
            return (end_y - start_y) == length - 1  # length -1 because the counter starts at 0
        elif start_y == end_y:
            print(end_x - start_x)
            return (end_x - start_x) == length - 1
        else:
            return False


class Battleship(Ship):
    def __init__(self, start_pos: tuple, end_pos: tuple):
        super().__init__(start_pos=start_pos, end_pos=end_pos)
        self.length = 5

    def check_length(self) -> bool:
        return super().check_length(self.length)


class Corvettes(Ship):
    def __init__(self, start_pos: tuple, end_pos: tuple):
        super().__init__(start_pos=start_pos, end_pos=end_pos)
        self.length = 4

    def check_length(self) -> bool:
        return super().check_length(self.length)


class Destroyer(Ship):
    def __init__(self, start_pos: tuple, end_pos: tuple):
        super().__init__(start_pos=start_pos, end_pos=end_pos)
        self.length = 3

    def check_length(self, length: int) -> bool:
        return super().check_length(self.length)


class Submarine(Ship):
    def __init__(self, start_pos: tuple, end_pos: tuple):
        super().__init__(start_pos=start_pos, end_pos=end_pos)
        self.length = 2

    def check_length(self) -> bool:
        return super().check_length(self.length)
