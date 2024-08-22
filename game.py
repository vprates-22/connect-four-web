import numpy as np
import socket

class Grid:
    def __init__(self, height:int, width:int) -> None:
        self.board = np.zeros((height, width))
        self.heigth = height
        self.width = width

    def check_diagonal(self, x:int, y:int) -> bool:
        """
        Função destinada a verificar se existem quatro peças 
            do mesmo jogador alinhadas na diagonal \\
        
        :param x: x da posição alterada
        :param y: y da posição alterada
        :return: se existem quatro peças alinhadas
        """
        for i in range(-3, 1):
            if not (x + i >= 0 and x + i + 3 < self.width
            and y + i >= 0 and y + i + 3 < self.heigth):
                
                continue

            if (self.board[x + i    , y + i    ] == self.board[x + i + 1, y + i + 1]
            and self.board[x + i + 2, y + i + 2] == self.board[x + i + 3, y + i + 3]
            and self.board[x + i    , y + i    ] == self.board[x + i + 3, y + i + 3]):
                
                return True
        
        return False
    
    def check_anti_diagonal(self, x:int, y:int) -> bool:
        """
        Função destinada a verificar se existem quatro peças 
            do mesmo jogador alinhadas na diagonal /
        
        :param x: x da posição alterada
        :param y: y da posição alterada
        :return: se existem quatro peças alinhadas
        """
        for i in range(0, 4):
            if not (x - i >= 0 and x - i + 3 < self.width
                and y + i - 3 >= 0 and y + i < self.heigth):
                
                continue

            if (self.board[x - i    , y + i    ] == self.board[x - i + 1, y + i - 1]
            and self.board[x - i + 2, y + i - 2] == self.board[x - i + 3, y + i - 3]
            and self.board[x - i    , y + i    ] == self.board[x - i + 3, y + i - 3]):
                
                return True
        
        return False
    
    def check_vertical(self, x:int, y:int) -> bool:
        """
        Função destinada a verificar se existem quatro peças 
            do mesmo jogador alinhadas na vertical
        
        :param x: x da posição alterada
        :param y: y da posição alterada
        :return: se existem quatro peças alinhadas
        """
        vertical = self.board[y:y+4, x] 
        if vertical.shape[0] < 4:
            return False
        return np.all(vertical == self.board[y, x])
                
    def check_horizontal(self, x:int, y:int) -> bool:
        """
        Função destinada a verificar se existem quatro peças 
            do mesmo jogador alinhadas na horizontal
        
        :param x: x da posição alterada
        :param y: y da posição alterada
        :return: se existem quatro peças alinhadas
        """
        horizontal = self.board[y, x-3:x+4]
        horizontal = horizontal == self.board[y, x]

        for i in range(horizontal.shape[0] - 3):
            if np.all(horizontal[i:i+4]):
                return True
        
        return False

    def check_win(self, x:int, y:int) -> bool:
        """
        Função destinada a verificar se existem quatro peças 
            do mesmo jogador alinhadas em qualquer direção

        :param x: x da posição alterada
        :param y: y da posição alterada
        :return: se existem quatro peças alinhadas
        """
        for check in [self.check_vertical, self.check_horizontal, self.check_anti_diagonal, self.check_diagonal]:
            if check(x, y):
                return True
        return False

    def add_piece(self, player:int, x:int, y:int) -> bool:
        """
        Função destinada a efetuar uma jogada

        :param player: o id do jogador
        :param x: x da posição alterada
        :param y: y da posição alterada
        :return: se existem quatro peças alinhadas
        """
        self.board[y, x] = player

        return self.check_win(x, y)

class ConnectFour:
    def __init__(self, player1:int, player2:int, heigth:int, width:int) -> None:
        self.board = Grid(heigth, width)

        self.player1 = player1
        self.player2 = player2

    def start_game(self) -> None:
        """
        Função destinada a iniciar o jogo

        :param: None
        :return: None
        """
        self.turn = 1

        # send message to the first player

    def next_turn(self) -> None:
        """
        Função destinada a atualizar o turno

        :param: None
        :return: None
        """
        self.turn += 1

    
