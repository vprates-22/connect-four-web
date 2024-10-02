import numpy as np

class Board:
    def __init__(self, height:int, width:int) -> None:
        """
        Initiate an instance of a Connect-Four Board

        :param height: game board height
        :param width: game board width
        """
        self.board = np.zeros((height, width))

        self.heigth = height
        self.width = width

        self._winning_sequence = []

    @property
    def winning_sequence(self) -> list:
        return self._winning_sequence

    def check_diagonal(self, x:int, y:int) -> bool:
        """
        Function intended to check if there are four pieces
            from the same player aligned diagonally \\
        
        :param x: x of the altered position
        :param y: y of the altered position
        :return: if there is four pieces aligned
        """
        for i in range(-3, 1):
            if not (x + i >= 0 and x + i + 3 < self.width
                and y + i >= 0 and y + i + 3 < self.heigth):
                
                continue

            if (self.board[y + i    , x + i    ] == self.board[y + i + 1, x + i + 1]
            and self.board[y + i + 2, x + i + 2] == self.board[y + i + 3, x + i + 3]
            and self.board[y + i    , x + i    ] == self.board[y + i + 3, x + i + 3]
            and self.board[y + i    , x + i    ] != 0):
                self._winning_sequence = [(y + i + j, x + i + j) for j in range(4)]
                return True
        
        return False
    
    def check_anti_diagonal(self, x:int, y:int) -> bool:
        """
        Function intended to check if there are four pieces
            from the same player aligned diagonally /
        
        :param x: x of the altered position
        :param y: y of the altered position
        :return: if there is four pieces aligned
        """
        for i in range(0, 4):
            if not (y - i >= 0 and y - i + 3 < self.heigth
                and x + i - 3 >= 0 and x + i < self.width):
                
                continue

            if (self.board[y - i    , x + i    ] == self.board[y - i + 1, x + i - 1]
            and self.board[y - i + 2, x + i - 2] == self.board[y - i + 3, x + i - 3]
            and self.board[y - i    , x + i    ] == self.board[y - i + 3, x + i - 3]
            and self.board[y - i    , x + i    ] != 0):
                self._winning_sequence = [(y - i + j, x + i - j) for j in range(4)]
                return True
        
        return False
    
    def check_vertical(self, x:int, y:int) -> bool:
        """
        Function intended to check if there are four pieces
            from the same player aligned vertically
        
        :param x: x of the altered position
        :param y: y of the altered position
        :return: if there is four pieces aligned
        """
        vertical = self.board[y:y+4, x]
        if vertical.shape[0] < 4:
            return False
        won = np.all(vertical == self.board[y, x])

        if won:
            self._winning_sequence = [(y + i, x) for i in range(4)]
        return won
               
    def check_horizontal(self, x:int, y:int) -> bool:
        """
        Function intended to check if there are four pieces
            from the same player aligned horizontally
        
        :param x: x of the altered position
        :param y: y of the altered position
        :return: if there is four pieces aligned
        """
        horizontal = self.board[y, x-3:x+4]
        horizontal = horizontal == self.board[y, x]

        for i in range(horizontal.shape[0] - 3):
            if np.all(horizontal[i:i+4]):
                self._winning_sequence = [(y, x - 3 + i + j) for j in range(4)]
                return True
        
        return False

    def check_win(self, x:int, y:int) -> bool:
        """
        Function intended to check if there are four pieces
            from the same player aligned in any direction
        
        :param x: x of the altered position
        :param y: y of the altered position
        :return: if there is four pieces aligned
        """
        for check in [self.check_vertical, self.check_horizontal, self.check_anti_diagonal, self.check_diagonal]:
            if check(x, y):
                return True
        return False

    def add_piece(self, player:int, x:int, y:int) -> bool:
        """
        Function intended to add a piece to the board
        
        :param player: integer representing the player who made the play
        :param x: x of the altered position
        :param y: y of the altered position
        :return: if there is four pieces aligned
        """
        self.board[y, x] = player

        return self.check_win(x, y)
    
class Connect4:
    def __init__(self, height:int, width:int) -> None:
        self.board = Board(height, width)

        self.NUM_PLAYERS = 2

        self._height = height
        self._width = width

        self._turn = 1

        self._game_won = False
        self._game_winner = None

        self._historical_plays = []

    @property
    def game_won(self) -> bool:
        return self._game_won

    @property
    def game_winner(self) -> bool:
        return self._game_winner

    @property
    def historical_plays(self) -> list:
        return self._historical_plays

    @property
    def turn(self) -> int:
        return self._turn

    def _cant_continue(self) -> bool:
        """
        Function intended to verify the continuity of the game
        
        :param: None
        :return: a boolean indicating if there is not more plays to be made
        """
        return np.all(self.board.board[0, :] != 0)

    def _next_turn(self) -> None:
        """
        Function intended to move to the next play

        :param: None
        :return: None
        """
        self._turn += 1

    def _get_y(self, x:int) -> int:
        """
        Function intended to find out which row the piece will land on

        :param x: x where the piece will be placed
        :return: the y where the piece will land on
        """
        column = self.board.board[::-1, x]
        # verify if there is empty spaces in that column
        if np.any(column == 0):
            return self._height - column.argmin() - 1
        return -1

    def _get_player(self) -> int:
        """
        Funtion intended to identify which player is playing

        :param: None
        :return: integer indicating which player is playing
        """
        return self.turn % self.NUM_PLAYERS + 1

    def _set_winner(self, player:int) -> None:
        """
        Function intended to set the variables _game_won and _game_winner after
        a player won the game

        :param player: integer indicating which player have won the game
        :return: None
        """
        self._game_won = True
        self._game_winner = player

    def _save_play(self, player:int, x:int, y:int) -> None:
        """
        Function intended to save each valid play in our historical data

        :param player: integer indicating which player made that move
        :param x: x where the piece will be placed
        :param y: y where the piece will land
        """
        self._historical_plays.append((player, x, y))

    def make_play(self, x:int) -> int:
        """
        Function intended to make a play

        :param x: x where the piece will be placed
        :return: a integer indicating if the game was won
                
                -1 -> the game is over without a winner

                 0 -> the game is not over

                 1 -> the game is over and there is a winner
        """
        # if the game was over return that it's was won
        if self.game_won:
            return 1

        if self._cant_continue():
            return -1

        y = self._get_y(x)
        player = self._get_player()

        # verify if it is not possible to place a piece in thar column
        if y < 0:
            return 0
        
        self._save_play(player, x, y)

        # verify if that play ended the game
        if self.board.add_piece(player, x, y):
            self._set_winner(player)
            return 1

        # if the game wasn't over move to the next turn
        self._next_turn()
        return 0