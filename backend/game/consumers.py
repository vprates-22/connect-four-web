import json
import string
import random

from .models import Rooms
from .game import Connect4

from asgiref.sync import sync_to_async
from rest_framework.authtoken.models import Token
from channels.generic.websocket import AsyncWebsocketConsumer


class PlayerBase(AsyncWebsocketConsumer):
    player = None
    failed_to_connect = False
    user = None

    async def connect(self)-> None:
        """
        Function intended to deal with the connection process

        :param: None

        :return: None
        """
        await self._handle_user_authentication()
        await self._create_variables()

        if self.failed_to_connect:
            await self.accept()
            await self._send_error_message(self.message, 'fatal_error')
            await self.close()
            return

        await self.channel_layer.group_add(self.game_room, self.channel_name)

        await self.accept()

        await self._send_message_after_connection()

    async def _handle_user_authentication(self) -> None:
        """
        Function intended to authenticate the user after the connection

        :param data: message received already parsed

        :return: None
        """
        try:
            query_result = await sync_to_async(Token.objects.select_related('user').get)(key = self.scope['url_route']['kwargs']['auth_token'])
            self.user = query_result.user
        except:
            err_msg = "You do not have the credentials to continue"
            self._send_error_message(err_msg, 'fatal_error')

    async def _create_variables(self) -> None:
        """
        Function intended to create variables related to one of the children classes

        :param: None

        :return: None
        """
        self.room = None
        self.room_id = None
        self.game_room = None

        self.height = None
        self.width = None
        
        self.connect4 = None

    async def _check_room_exist(self) -> None:
        """
        Function intended to verify whether a room has been created,
            if it is not in the db we change the failed_to_connect to True
        
        :param: None

        :return: None
        """
        self.room = await sync_to_async(Rooms.objects.filter)(id = self.room_id)
        self.room = await sync_to_async(self.room.first)()

        if self.room is None:
            self.message = 'Room do not exist'            
            self.failed_to_connect = True

    def _check_room_is_active(self) -> None:
        """
        Function intended to verify whether the room is active, it means
            either the player one is waiting or both players are online

        :param: None

        :return: None
        """
        if self.room.active:
            return
        
        self.message = 'Room is inactive'
        self.failed_to_connect = True

    async def _send_message_after_connection(self) -> None:
        """
        Function intended to send a message after a connection is established

        :param: None

        :return: None
        """
        pass

    async def _send_error_message(self, msg:str, msg_type:str='error') -> None:
        """
        Function intended to notify the user whether there was an error

        :param msg_type: type of the error
        :param msg: text explaining the error

        :return: None
        """        
        await self.send(text_data=json.dumps({
            'type' : msg_type,
            'message' : msg,
            'height' : None,
            'width' : None,
            'player' : None,
            'game_active' : self.room.active and self.room.started,
            'board' : None,
            'lowest_tiles': None,
            'x' : None,
            'turn' : None,
            'game_won' : None,
            'game_winner' : None,
            'winning_sequence' : None,
        }))

    async def warn_player(self, event:dict) -> None:
        """
        Function intended to warn all active users that a new user has joined the room

        :param event: the message data [message, 
                                        height, 
                                        width]

        :return: None
        """
        await self.send(text_data=json.dumps({
            'type' : event['msg_type'],
            'message' : event['message'],
            'height' : event['height'],
            'width' : event['width'],
            'player' : self.player,
            'game_active' : event['game_active'],
            'board' : event['board'],
            'lowest_tiles': event['lowest_tiles'],
            'x' : None,
            'turn' : event.get('turn', None),
            'game_won' : event.get('game_won', None),
            'game_winner' : event.get('game_winner', None),
            'winning_sequence' : event.get('winning_sequence', None),
        }))

    async def _handle_play(self, data:dict) -> None:
        """
        Function intended to handle a move made by a player

        :param data: message received already parsed

        :return: None
        """
        x = int(data['x'])
        
        await self._get_game_state()

        if not self.room.started:
            await self._send_error_message('Waiting someone to join this room')
            return

        if self.room.game_over:
            await self._send_error_message('Game already over')
            return

        play_return_code = self.connect4.make_play(x, self.player)

        message = self._get_message(play_return_code, x)
        if play_return_code < 0:
            await self._send_error_message(message)
            return

        await self._send_game_message(x, message)

        if play_return_code > 0:
            self.room.game_over = True

        await self._save_game_state()

    async def receive(self, text_data:str|bytes|bytearray) -> None:
        """
        Function intended to deal with the message sent by the users

        :param text_data: the message sent by the user

        :return: None
        """
        data = json.loads(text_data)


        if data['type'] == 'move':
            await self._handle_play(data)

    def _get_message(self, return_code:int, x:int = None) -> str:
        """
        Function intended to get the message associated with the return_code of the move

        :param return_code: integer returned by the Connect4.make_play function
        :param x: the x where the move was made
        
        :return: 
        """
        return {
            -2 :  'Invalid move',
            -1 :  'Wrong turn',
             0 : f'Player {self.player} : {x}',
             1 : f'Player {self.connect4.game_winner} WON',
             2 :  'Its a draw'
        }[return_code]

    async def _get_game_state(self) -> None:
        """
        Function intended to update the state of the game instance

        :param: None

        :return: None
        """
        await sync_to_async(self.room.refresh_from_db)()
        self.connect4 = Connect4(state = self.room.game_state)

    async def _save_game_state(self) -> None:
        """
        Function intended to save the state of the game into the db

        :param: None

        :return: None
        """        
        self.room.game_state = self.connect4.serialize()
        await sync_to_async(self.room.save)()

    async def _send_game_message(self, x:int, message:str, msg_type:str='play') -> None:
        """
        Function intended to broadcast a game move to all the active players

        :param x: the x where the move was made
        :param message: the message associated with that move

        :return: None
        """        
        await self.channel_layer.group_send(
            self.game_room, {'type' : 'broadcast.move', 
                            'msg_type' : msg_type,
                            'message' : message,
                            'height' : self.room.height,
                            'width' : self.room.width,
                            'player' : self.player,
                            'game_active' : self.room.active and self.room.started,
                            'board' : self.connect4.game_board if msg_type == 'play' else None,
                            'lowest_tiles': self.connect4.lowest_tiles if msg_type == 'play' else None,                         
                            'x' : x,
                            'turn' : self.connect4.turn,
                            'game_won' : self.connect4.game_won,
                            'game_winner' : self.connect4.game_winner,
                            'winning_sequence' : self.connect4.winning_sequence,
                            })

    async def broadcast_move(self, event:dict) -> None:
        """
        Function intended to send to a player a move 

        :param event: the message data

        :return: None
        """
        await self.send(text_data=json.dumps({
                                'type' : event['msg_type'],
                                'message' : event['message'],
                                'height' : event['height'],
                                'width' : event['width'],
                                'player' : event['player'],
                                'game_active' : event['game_active'],
                                'board' : event['board'],
                                'lowest_tiles': event['lowest_tiles'],                                
                                'x' : event['x'],
                                'turn' : event['turn'],
                                'game_won' : event['game_won'],
                                'game_winner' : event['game_winner'],
                                'winning_sequence' : event['winning_sequence'],
                                }))

    async def disconnect(self, close_code:int) -> None:
        """
        Function intended to

        :param close_code: the code send to the user to indicate why the connection is being closed

        :return: None
        """
        if self.failed_to_connect:
            return

        msg_type = 'viewer_out'
        message = 'Viewer left the room'

        if self.player < 3:
            self.room.active = False
            await sync_to_async(self.room.save)()

            msg_type = 'kill'
            message = f'Player {self.player} left the game'

        await self.channel_layer.group_send(
            self.game_room, {'type' : 'disconnect.message', 'player' : self.player, 
                                'message' : message, 'msg_type' : msg_type, 
                                'game_active' : self.room.active and self.room.started}
        )

        await self.channel_layer.group_discard(self.game_room, self.channel_name)

    async def disconnect_message(self, event:dict) -> None:
        """
        Function intended to send a disconnet message to a player

        :param event: the message data

        :return: None
        """
        await self.send(text_data=json.dumps(
            {
            'type' : event['msg_type'],
            'message' : event['message'],
            'height' : None,
            'width' : None,
            'player' : event['player'],
            'game_active' : event['game_active'],
            'board' : None,
            'lowest_tiles': None,            
            'x' : None,
            'turn' : None,
            'game_won' : None,
            'game_winner' : None,
            'winning_sequence' : None,
            }))

        if event['player'] < 3:
            await self.close()

class PlayerOneConsumer(PlayerBase):
    player = 1

    async def _create_variables(self) -> None:
        self.room = None

        self.height = int(self.scope['url_route']['kwargs']['height'])
        self.width = int(self.scope['url_route']['kwargs']['width'])
        self.connect4 = Connect4(self.height, self.width)
        
        self.room_id = await self._create_room()
        self.game_room = f'room_{self.room_id}'

    async def _send_message_after_connection(self) -> None:
        await self.send(text_data=json.dumps(
            {
            'type' : 'room-id',
            'message': self.room_id,
            'height' : self.room.height,
            'width' : self.room.width,
            'player' : None,
            'game_active' : self.room.active and self.room.started,
            'board' : None,
            'lowest_tiles': None,            
            'x' : None,
            'turn' : None,
            'game_won' : None,
            'game_winner' : None,
            'winning_sequence' : None,
            }))

    async def _create_room(self) -> str:
        """
        Function intended to generate a unique random room key

        :param: None

        :return: the room key otherwise an empty string
        """
        MAX_TRIES = 10

        for _ in range(MAX_TRIES):
            room_id = self._generate_room_id()
            room = await sync_to_async(Rooms.objects.filter)(id = room_id)
            room = await sync_to_async(room.first)()

            if room is not None:
                continue

            self.room = Rooms(id = room_id,
                              height = self.height,
                              width = self.width,
                              player_one_email = self.user.email,
                              player_one_username = self.user.username,
                              game_state = self.connect4.serialize())
                    
            await sync_to_async(self.room.save)()
            return room_id

        self.failed_to_connect = True
        self.message = 'Unable to generate a room'
        return '' # almost impossible to reach that point

    @staticmethod
    def _generate_room_id() -> str:
        return ''.join(
                    random.choice(
                                string.ascii_uppercase +
                                string.ascii_lowercase +
                                string.digits
                                ) for _ in range(20)
                    )        

class PlayerTwoConsumer(PlayerBase):
    player = 2

    async def _create_variables(self) -> None:
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.game_room = f'room_{self.room_id}'

        await self._check_room_exist()
        if self.failed_to_connect: return
                
        self._check_room_is_active()
        if self.failed_to_connect: return
        
        self._check_room_is_full()
        if self.failed_to_connect: return

        await self._get_game_data()
        await self._update_room_data()

    async def _get_game_data(self) -> None:
        """
        Function intended to get information about the game board

        :param: None

        :return: None
        """
        self.connect4 = Connect4(state=self.room.game_state)

        self.height = self.room.height
        self.width = self.room.width

    def _check_room_is_full(self) -> None:
        """
        Funtion intended to verify if the room already has a player two

        :param: None
        
        :return: None
        """
        if not self.room.started:
            return
        
        self.message = 'Room is full'
        self.failed_to_connect = True

    async def _update_room_data(self) -> None:
        """
        Function intended to update the db, that room is now ready to start

        :param: None

        :return: None
        """
        if self.room.player_one_email == self.user.email:
            self.failed_to_connect = True
            self.message = "Already in the Room"
            return

        self.room.active = True
        self.room.started = True
        self.room.player_two_email = self.user.email
        self.room.player_two_username = self.user.username
        
        await sync_to_async(self.room.save)()

    async def _send_message_after_connection(self) -> None:
        await self.channel_layer.group_send(
            self.game_room, {'type' : 'warn.player',
                             'msg_type' : 'start',
                             'message' : self.room_id,
                             'game_active' : self.room.active and self.room.started,   
                             'board' : self.connect4.game_board,
                             'lowest_tiles': self.connect4.lowest_tiles,
                             'height' : self.room.height,
                             'width' : self.room.width,
                             'turn' : self.connect4.turn,
                             'game_won' : self.connect4.game_won,
                             'game_winner' : self.connect4.game_winner,
                             'winning_sequence' : self.connect4.winning_sequence, 
                             })

class ViewerConsumer(PlayerBase):
    player = 3

    async def _create_variables(self) -> None:
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.game_room = f'room_{self.room_id}'

        await self._check_room_exist()
        if self.failed_to_connect: return
        
        self._check_room_is_active()
        if self.failed_to_connect: return

        self.connect4 = Connect4(state=self.room.game_state)

    async def _send_message_after_connection(self) -> None:
        await self.channel_layer.group_send(
            self.game_room, {'type' : 'warn.player',
                             'msg_type' : 'viewer_join',
                             'message' : 'A new viewer has joined the room',
                             'game_active' : self.room.active and self.room.started,
                             'board' : None,
                             'lowest_tiles': None,                          
                             'height' : None,
                             'width' : None,
                             })
        
        await self.send(json.dumps({
                                'type' : 'start',
                                'message': self.room_id,
                                'height' : self.room.height,
                                'width' : self.room.width,
                                'player' : self.player,
                                'game_active' : self.room.active and self.room.started,
                                'board' : self.connect4.game_board,
                                'lowest_tiles': self.connect4.lowest_tiles,
                                'x' : None,
                                'turn' : self.connect4.turn,
                                'game_won' : self.connect4.game_won,
                                'game_winner' : self.connect4.game_winner,
                                'winning_sequence' : self.connect4.winning_sequence,
                            }))

    async def receive(self, text_data:str|bytes|bytearray) -> None:
        data = json.loads(text_data)
        x = int(data['x'])

        await self._get_game_state()
        
        play_return_code = self.connect4.make_play(x, self.player)

        message = self._get_message(play_return_code, x)
        if play_return_code < 0:
            await self._send_error_message(message)
            return

        await self._send_game_message(x, message, msg_type='viewer_tip')

    def _get_message(self, return_code:int, x:int = None) -> str:
        return {
            -2 :  'Invalid move',
            -1 :  'Wrong turn',
             0 : f'Viewer suggested you to play : {x}'
        }.get(return_code, '')