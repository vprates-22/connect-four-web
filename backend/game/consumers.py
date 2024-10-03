import json
import string
import random

from .models import Rooms
from .game import Connect4

from django.db import IntegrityError
from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer

class PlayerBase(AsyncWebsocketConsumer):
    turn = None
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

    async def _send_message_after_connection(self) -> None:
        pass

    async def _send_error_message(self, msg) -> None:
        await self.send(text_data=json.dumps({
            'type' : 'error',
            'message' : msg
        }))

    async def warn_player(self, event) -> None:
        await self.send(text_data=json.dumps(
        {
        'type' : 'start',
        'message' : 'Ladies and gentlemen, start your engines\nbecause Stone Cold said so!',
        'player' : self.player
        }))

    async def receive(self, text_data) -> None:
        data = json.loads(text_data)
        x = data['x']
        y = data['y']

        self.state = await sync_to_async(self.room.refresh_from_db)()
        self.connect4 = Connect4(state = self.state)

        if self.connect4.turn % 2 != self.turn:
            await self.send(text_data=json.dumps(
                {
                'type' : 'error',
                'message' : 'not your turn to play'
                }))
            return
        
        play_flag = self.connect4.make_play(x, y)

        if play_flag == 1:
            # game won
            pass
        elif play_flag == 0:
            # make move, keep going
            pass
        else:
            # game over without winner
            pass


        await self.channel_layer.group_send(
            self.game_room, {'type' : 'broadcast.move', 
                                'player' : self.player,
                                'x' : x,
                                'y' : y,
                                'game_winner' : self.connect4.game_won,
                                'winning sequence' : self.connect4.winning_sequence,
                            }
        )


    def game_manage(self):
        pass

    async def broadcast_move(self, event) -> None:
        await self.send(text_data=json.dumps(
            {
            'type' : 'kill',
            'player' : self.player,

            }))

    async def disconnect(self, close_code) -> None:
        if self.failed_to_connect:
            await self.close()
            return

        self.room.active = False
        await sync_to_async(self.room.save)()

        await self.channel_layer.group_send(
            self.game_room, {'type' : 'disconnect.message'}
        )

        await self.channel_layer.group_discard(self.game_room, self.channel_name) 

    async def disconnect_message(self, event) -> None:
        await self.send(text_data=json.dumps(
            {
            'type' : 'kill',
            'message' : 'Mamba Out',
            'player' : self.player
            }))

        await self.close()

class PlayerOneConsumer(PlayerBase):
    player = 1
    turn = 1

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
            'message': self.room_id
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
                                  width = self.width)
                        
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
    turn = 0

    async def _create_variables(self) -> None:
        self.room_id = self.scope['url_route']['kwargs']['room_id']
        self.game_room = f'room_{self.room_id}'

        await self._check_room_exist()
        if self.failed_to_connect: return
                
        self._check_room_available()
        if self.failed_to_connect: return

        await self._get_game_data()
        await self._update_room_data()

    async def _check_room_exist(self) -> None:
        self.room = await sync_to_async(Rooms.objects.filter)(id = self.room_id)
        self.room = await sync_to_async(self.room.first)()

        if self.room is None:
            self.message = 'Room do not exist'            
            self.failed_to_connect = True
        self.room_id = self.room_id

    def _check_room_available(self) -> None:
        if not self.room.active:
            self.message = 'Room is inactive'
            self.failed_to_connect = True
            return

        if self.room.started:
            self.message = 'Room is full'
            self.failed_to_connect = True
            return

    async def _get_game_data(self) -> None:
        self.height = self.room.height
        self.width = self.room.width

    async def _update_room_data(self) -> None:
        self.room.active = True
        self.room.started = True
        self.room.player_two = self.channel_name
        
        await sync_to_async(self.room.save)()

    async def _send_message_after_connection(self) -> None:
        await self.channel_layer.group_send(
            self.game_room, {'type' : 'warn.player'}
        )

    async def warn_player(self, event) -> None:
        await self.send(text_data=json.dumps(
            {
            # 'type' : 'start',
            'message' : 'Ladies and gentlemen, start your engines\nbecause Stone Cold said so!',
            'player' : self.player
            }))