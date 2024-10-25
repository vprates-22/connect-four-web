import json
import string
import random

from .models import Rooms
from .game import Connect4

from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

class PlayerBase(AsyncWebsocketConsumer):
    player = None
    failed_to_connect = False

    async def connect(self)-> None:
        await self._create_variables()

        if self.failed_to_connect:
            await self.accept()
            await self._send_error_message(self.message)
            await self.close()
            return

        await self.channel_layer.group_add(self.game_room, self.channel_name)

        await self.accept()

        await self._send_message_after_connection()

    async def _create_variables(self) -> None:
        pass

    async def _check_room_exist(self) -> None:
        self.room = await sync_to_async(Rooms.objects.filter)(id = self.room_id)
        self.room = await sync_to_async(self.room.first)()

        if self.room is None:
            self.message = 'Room do not exist'            
            self.failed_to_connect = True
        self.room_id = self.room_id

    def _check_room_is_active(self) -> None:
        if not self.room.active:
            self.message = 'Room is inactive'
            self.failed_to_connect = True
            return

    async def _send_message_after_connection(self) -> None:
        pass

    async def _send_error_message(self, msg) -> None:
        await self.send(text_data=json.dumps({
            'type' : 'error',
            'message' : msg,
            'height' : self.room.height,
            'width' : self.room.width,
            'player' : None,
            'x' : None,
            'turn' : None,
            'game_won' : None,
            'game_winner' : None,
            'winning_sequence' : None,
        }))

    async def warn_player(self, event) -> None:
        await self.send(text_data=json.dumps(
        {
        'type' : 'start',
        'message' : event['message'],
        'height' : event['height'],
        'width' : event['width'],
        'player' : event['player'],
        'x' : None,
        'turn' : None,
        'game_won' : None,
        'game_winner' : None,
        'winning_sequence' : None,
        }))

    async def receive(self, text_data) -> None:
        data = json.loads(text_data)
        print(data)

        x = int(data['x'])

        await self._get_game_state()

        if not self.room.started:
            await self._send_error_message('Waiting someone to join this room')
            return

        play_return_code = self.connect4.make_play(x, self.player)
        print(self.connect4.board.board)

        message = self._get_message(play_return_code, x)
        if play_return_code < 0:
            await self._send_error_message(message)
            return

        await self._send_game_message(x, message)

        await self._save_game_state()    

    def _get_message(self, return_code:int, x:int = None) -> str:
        return {
            -2 :  'Invalid move',
            -1 :  'Wrong turn',
             0 : f'Player {self.player} : {x}',
             1 : f'Player {self.connect4.game_winner} WON',
             2 :  'Its a draw'
        }[return_code]

    async def _get_game_state(self) -> None:
        await sync_to_async(self.room.refresh_from_db)()
        self.connect4 = Connect4(state = self.room.game_state)

    async def _save_game_state(self) -> None:
        self.room.game_state = self.connect4.serialize()
        await sync_to_async(self.room.save)()

    async def _send_game_message(self, x:int, message:str) -> None:
        await self.channel_layer.group_send(
            self.game_room, {'type' : 'broadcast.move', 
                            'message' : message,
                            'height' : self.room.height,
                            'width' : self.room.width,
                            'player' : self.player,
                            'x' : x,
                            'turn' : self.connect4.turn,
                            'game_won' : self.connect4.game_won,
                            'game_winner' : self.connect4.game_won,
                            'winning_sequence' : self.connect4.winning_sequence,
                            }
        )

    async def broadcast_move(self, event) -> None:
        event_copy = {k : v for k, v in event.items()}
        event_copy['type'] = 'play'
        await self.send(text_data=json.dumps(event_copy))

    async def disconnect(self, close_code) -> None:
        if self.failed_to_connect:
            return

        if self.player < 3:
            self.room.active = False
            await sync_to_async(self.room.save)()

        await self.channel_layer.group_send(
            self.game_room, {'type' : 'disconnect.message', 'player' : self.player}
        )

        await self.channel_layer.group_discard(self.game_room, self.channel_name)

    async def disconnect_message(self, event) -> None:
        await self.send(text_data=json.dumps(
            {
            'type' : 'kill',
            'message' : 'Mamba Out',
            'height' : event['height'],
            'width' : event['width'],
            'player' : event['player'],
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
            'x' : None,
            'turn' : None,
            'game_won' : None,
            'game_winner' : None,
            'winning_sequence' : None,
            }))

    async def _create_room(self) -> str|int:
        MAX_TRIES = 10
        attempt = 0

        while attempt < MAX_TRIES:
            room_id = self._generate_room_id()
            room = await sync_to_async(Rooms.objects.filter)(id = room_id)
            room = await sync_to_async(room.first)()

            if room is None:
                self.room = Rooms(id = room_id,
                                  player_one = self.channel_name,
                                  player_two = None,
                                  height = self.height,
                                  width = self.width,
                                  game_state = self.connect4.serialize())
                        
                await sync_to_async(self.room.save)()
                return room_id
            else:
                attempt += 1

        self.failed_to_connect = True
        self.message = 'Unable to generate a room'
        return -1 # almost impossible to reach that point

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
        self.height = self.room.height
        self.width = self.room.width

    def _check_room_is_full(self) -> None:
        if self.room.started:
            self.message = 'Room is full'
            self.failed_to_connect = True
            return

    async def _update_room_data(self) -> None:
        self.room.active = True
        self.room.started = True
        self.room.player_two = self.channel_name
        
        await sync_to_async(self.room.save)()

    async def _send_message_after_connection(self) -> None:
        await self.channel_layer.group_send(
            self.game_room, {'type' : 'warn.player',
                             'message' : 'Ladies and gentlemen, start your engines\nbecause Stone Cold said so!',
                             'height' : self.room.height,
                             'width' : self.room.width,
                             'player' : self.player
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

    async def _send_message_after_connection(self) -> None:
        await self.channel_layer.group_send(
            self.game_room, {'type' : 'warn.player',
                             'message' : 'I see dead people ... AND I SEE YOU!!!',
                             'height' : self.room.height,
                             'width' : self.room.width,
                             'player' : self.player}
        )

    async def receive(self, text_data) -> None:
        data = json.loads(text_data)
        x = int(data['x'])

        await self._get_game_state()
        
        play_return_code = self.connect4.make_play(x, self.player)

        message = self._get_message(play_return_code, x)
        if play_return_code < 0:
            await self._send_error_message(message)
            return

        await self._send_game_message(x, message)

    def _get_message(self, return_code:int, x:int = None) -> str:
        return {
            -2 :  'Invalid move',
            -1 :  'Wrong turn',
             0 : f'Viewer suggested you to play : {x}'
        }[return_code]