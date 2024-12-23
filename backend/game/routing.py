from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/single_player/(?P<height>[0-9]+)/(?P<width>[0-9]+)/(?P<difficulty>[0-9])/(?P<auth_token>\w+)/$', consumers.SinglePlayerConsumer.as_asgi()),
    re_path(r'ws/create/(?P<height>[0-9]+)/(?P<width>[0-9]+)/(?P<auth_token>\w+)/$', consumers.PlayerOneConsumer.as_asgi()),
    re_path(r'ws/join/(?P<room_id>\w+)/(?P<auth_token>\w+)/$', consumers.PlayerTwoConsumer.as_asgi()),
    re_path(r'ws/watch/(?P<room_id>\w+)/(?P<auth_token>\w+)/$', consumers.ViewerConsumer.as_asgi()),
]