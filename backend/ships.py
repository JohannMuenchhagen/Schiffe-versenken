class Ship:
    # Coordinate y,x first column than row

    def __init__(self, start_pos: tuple, end_pos: tuple):
        self.start_pos = start_pos
        self.end_pos = end_pos

    def check_length(self, length: int) -> bool:  # check if the coordinates equals the ship length
        start_column, start_row = self.start_pos
        end_column, end_row = self.end_pos
        if start_row == end_row:
            return (end_column - start_column) == length - 1  # length -1 because the counter starts at 0
        elif start_column == end_column:
            print(end_row - start_row)
            return (end_row - start_row) == length - 1
        else:
            return False

    def get_positions(self) -> list:
        start_column, start_row = self.start_pos
        end_column, end_row = self.end_pos
        positions = [self.start_pos]
        if start_row == end_row:
            column = start_column
            while column < end_column:
                column += 1
                positions.append((column, start_row))
            return positions
        else:
            row = start_row
            while row < end_row:
                row += 1
                positions.append((start_column, row))
            return positions


class Battleship(Ship):
    def __init__(self, start_pos: tuple, end_pos: tuple):
        super().__init__(start_pos=start_pos, end_pos=end_pos)
        self.length = 5


class Corvettes(Ship):
    def __init__(self, start_pos: tuple, end_pos: tuple):
        super().__init__(start_pos=start_pos, end_pos=end_pos)
        self.length = 4


class Destroyer(Ship):
    def __init__(self, start_pos: tuple, end_pos: tuple):
        super().__init__(start_pos=start_pos, end_pos=end_pos)
        self.length = 3


class Submarine(Ship):
    def __init__(self, start_pos: tuple, end_pos: tuple):
        super().__init__(start_pos=start_pos, end_pos=end_pos)
        self.length = 2
