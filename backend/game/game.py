import numpy as np

class Board:
    def __init__(self, height:int=None, width:int=None, state:dict = None) -> None:
        """
        Initiate an instance of a Connect-Four Board

        :param height: game board height
        :param width: game board width
        :param state:

        :return: an instance of a Connect-Four Bourd
        """
        if state is None:
            self.board = np.zeros((height, width), dtype=int)

            self.heigth = height
            self.width = width

            self._winning_sequence = []
            self._lowest_rows = [height - 1 for _ in range(width)]
        else:
            for key, value in state.items():
                setattr(self, key, value)
            self.board = np.array(self.board, dtype=int)

    @property
    def winning_sequence(self) -> list:
        return self._winning_sequence

    @property
    def lowest_rows(self) -> list:
        return self._lowest_rows

    def _check_diagonal(self, x:int, y:int) -> bool:
        """
        Function intended to check whether there are four pieces
            from the same player aligned diagonally \\
        
        :param x: x of the altered position
        :param y: y of the altered position
        
        :return: whether there is four pieces aligned
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
    
    def _check_anti_diagonal(self, x:int, y:int) -> bool:
        """
        Function intended to check whether there are four pieces
            from the same player aligned diagonally /
        
        :param x: x of the altered position
        :param y: y of the altered position
        
        :return: whether there is four pieces aligned
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
    
    def _check_vertical(self, x:int, y:int) -> bool:
        """
        Function intended to check whether there are four pieces
            from the same player aligned vertically
        
        :param x: x of the altered position
        :param y: y of the altered position
        
        :return: whether there is four pieces aligned
        """
        vertical = self.board[y:y+4, x]
        if vertical.shape[0] < 4:
            return False
        won = np.all(vertical == self.board[y, x])

        if won:
            self._winning_sequence = [(y + i, x) for i in range(4)]
        return won
               
    def _check_horizontal(self, x:int, y:int) -> bool:
        """
        Function intended to check whether there are four pieces
            from the same player aligned horizontally
        
        :param x: x of the altered position
        :param y: y of the altered position
        
        :return: whether there is four pieces aligned
        """
        horizontal = self.board[y, x-3:x+4]
        horizontal = horizontal == self.board[y, x]

        for i in range(horizontal.shape[0] - 3):
            if np.all(horizontal[i:i+4]):
                self._winning_sequence = [(y, x - 3 + i + j) for j in range(4)]
                return True
        
        return False

    def _check_win(self, x:int, y:int) -> bool:
        """
        Function intended to check whether there are four pieces
            from the same player aligned in any direction
        
        :param x: x of the altered position
        :param y: y of the altered position
        
        :return: whether there is four pieces aligned
        """
        for check in [self._check_vertical, self._check_horizontal, self._check_anti_diagonal, self._check_diagonal]:
            if check(x, y):
                return True
        return False

    def _get_y(self, x:int) -> int:
        """
        Function intended to get the lowest spot that we can place a tile

        :param x: the x we want to place a tile

        :return: the lowest tile allowed to 
        """
        return self._lowest_rows[x]

    def add_piece(self, player:int, x:int, y:int) -> bool:
        """
        Function intended to add a piece to the board
        
        :param player: integer representing the player who made the play
        :param x: x of the altered position
        :param y: y of the altered position
        
        :return: whether there is four pieces aligned
        """
        self.board[y, x] = player
        self._lowest_rows[x] -= 1

        return self._check_win(x, y)
    
    def to_dict(self) -> None:
        """
        Function intended to turn the numpy objects into lists

        :param: None

        :return: None
        """
        self.board = self.board.tolist()

class Connect4:
    def __init__(self, height:int = None, width:int = None, state:dict = None) -> None:
        """
        Function intended to create an instance of Connect4

        :param height: the boards height
        :param width: the boards width
        :param state: a serialized instance of Connect4

        :return: an instance of Connect4
        """
        if state is None:
            if height is None or width is None:
                raise Exception('')
            
            self.NUM_PLAYERS = 2
            self.board = Board(height, width)

            self._height = height
            self._width = width

            self._turn = 1

            self._game_won = False
            self._game_winner = None

            self._historical_plays = []

        else:
            for key, value in state.items():
                setattr(self, key, value)

            self.board = Board(state=self.board)

    @property
    def winning_sequence(self) -> list:
        return self.board._winning_sequence

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
    def game_board(self) -> list:
        return self.board.board.tolist()

    @property
    def lowest_tiles(self) -> list:
        return self.board.lowest_rows

    @property
    def turn(self) -> int:
        return self._turn

    def _cant_continue(self) -> bool:
        """
        Function intended to verify the continuity of the game
        
        :param: None
        
        :return: a boolean indicating whether there is not more plays to be made
        """
        return np.all(self.board.board[0, :] != 0)

    def _next_turn(self) -> None:
        """
        Function intended to move to the next play

        :param: None
        
        :return: None
        """
        self._turn += 1

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

        :return: None
        """
        self._historical_plays.append((player, x, y))

    def _verify_player_turn(self, player:int) -> bool:
        """
        Function intended to verify whether it's that player turn

        :param player: an integer that represents the player
        
        :return: a boolean indicating whether it's that player turns
        """
        return self.turn % 2 == player % 2 or player == 3

    def _verify_play_is_valid(self, x:int, y:int) -> bool:
        """
        Funtion intended to verify if a play is 

        :param x:
        :param y:

        :return:
        """
        if x < 0 or x > self._width or y < 0:
            return False
        return True

    def make_play(self, x:int, player:int) -> int:
        """
        Function intended to make a play 

        :param x: x where the piece will be placed
        :param player: an integer that represents the player
        
        :return: an integer indicating if the game was won

                -2 -> invalid move, out of bounds
        
                -1 -> wrong turn

                 0 -> the game is not over

                 1 -> the game is over and there is a winner

                 2 -> the game is over without a winner
        """
        # if the game was over return that it's was won
        if self.game_won:
            return 1

        if self._cant_continue():
            return 2

        if not self._verify_player_turn(player):
            return -1

        y = self.board._get_y(x)
        # verify if it is not possible to place a piece in thar column
        if not self._verify_play_is_valid(x, y):
            return -2
        
        self._save_play(player, x, y)

        # verify if that play ended the game
        if self.board.add_piece(player, x, y):
            self._set_winner(player)
            return 1

        # if the game wasn't over move to the next turn
        self._next_turn()
        return 0
    
    def _to_dict(self) -> 'Connect4':
        """
        Function intended to convert the most complex data 
        structures into basic ones, making it possible to 
        serialize the class into a JSON object     

        :param: None

        :return: this instance
        """
        self.board.to_dict()
        self.board = self.board.__dict__
        return self
    
    def serialize(self) -> dict:
        """
        Function intended to serialize the class data into a JSON object

        :param: None

        :return: a dictionary that is savable in a JSON field
        """
        return self._to_dict().__dict__