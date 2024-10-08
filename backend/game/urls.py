from django.urls import path, include
from . import views

urlpatterns = [
    path('create/', views.create_room, name = 'new room'),
    path('join/<str:room_id>/', views.join_room, name = 'join room'),
    path('watch/<str:room_id>/', views.watch_room, name = 'join room'),
]