from copy import deepcopy
from .game import Connect4, np

EMPTY = 0
PLAYER = 1
AI = 2

WINDOW_SIZE = 4

def eval_window(window:list) -> int:
    """
    Function intended to evaluate a 

    :param window: a list with four consecutive spots

    :return: a value calculated by the heuristic function for the received window
    """
    empty_count = window.count(EMPTY)
    ai_count = window.count(AI)
    player_count = window.count(PLAYER)

    if ai_count == 3 and empty_count == 1:
        return 10
    elif ai_count == 2 and empty_count == 2:
        return 5
    elif ai_count == 1 and empty_count == 3:
        return 1

    elif player_count == 3 and empty_count == 1:
        return -20
    elif player_count == 2 and empty_count == 2:
        return -4
    
    return 0

def eval_game(game:Connect4) -> int:
    """
    Function intended to evaluate a state of the game

    :param game: the instance of a Connect4 game

    :return: a value calculated by the heuristic function for the state
    """
    board = game.board.board

    height = game.board.height
    width = game.board.width

    value = 0

    # diagonal
    for r in range(height - 3):
        for c in range(width - 3):
            window = [board[r + i, c + i] for i in range(WINDOW_SIZE)]
            value += eval_window(window)
        
    # anti-diagonal
    for r in range(height - 3):
        for c in range(width - 3):
            window = [board[r + 3 - i, c + i] for i in range(WINDOW_SIZE)]
            value += eval_window(window)

    # horizontal
    for r in range(height):
        for c in range(width - 3):
            window = [board[r, c + i] for i in range(WINDOW_SIZE)]
            value += eval_window(window)
    
    # vertical
    for r in range(height - 3):
        for c in range(width):
            window = [board[r + i, c] for i in range(WINDOW_SIZE)]
            value += eval_window(window)

    return value

def alpha_beta(game:Connect4, depth:int, alpha:int, beta:int, maximizing:bool) -> int:
    """
    Function intended to explore the tree of states

    :param game: the instance of a Connect4 game
    :param depth: the amount of plays ahead that the bot will consider to make the next play
    :param alpha: the value associated with the maximzing player
    :param beta: the value associated with the minimizing player
    :param maximizing: a boolean indicating whether we are maximizing or minimizing

    :return: a tuple with the selected x and the best value associated with it
    """
    if game.game_won or np.all(game.lowest_tiles == -1):
        if game.game_winner == PLAYER:
            return None, -1000
        elif game.game_winner == AI:
            return None, 1000
        else:
            return None, 0

    if depth == 0:
        return None, eval_game(game)

    if maximizing:
        best_x = -1
        val_max = -float('inf')
        for x in range(game._width):
            if game.lowest_tiles[x] < 0:
                continue
            game_copy = deepcopy(game)
            game_copy.make_play(x, AI)
            value = alpha_beta(game_copy, depth-1, alpha, beta, False)[1]
            if val_max < value:
                best_x = x
                val_max = value
            alpha = max(alpha, value)
            if beta <= alpha:
                break

        return best_x, alpha

    else:
        best_x = -1
        val_min = float('inf')
        for x in range(game._width):
            if game.lowest_tiles[x] < 0:
                continue
            game_copy = deepcopy(game)
            game_copy.make_play(x, PLAYER)
            value = alpha_beta(game_copy, depth-1, alpha, beta, True)[1]
            if value < val_min:
                best_x = x
                val_min = value
            beta = min(beta, value)
            if beta <= alpha:
                break

        return best_x, beta

def get_best_play(game:Connect4, max_depth:int) -> int:
    """
    Function intended to obtain the best play possible considering the next max_depth plays

    :param game: the instance of a Connect4 game
    :param max_depth: the amount of plays ahead that the bot will consider to make the next play

    :return: the X where the bot will place the tile
    """
    x, _ = alpha_beta(deepcopy(game), max_depth+1, -float('inf'), float('inf'), True)
    return x