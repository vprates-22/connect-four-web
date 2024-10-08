from django.shortcuts import render

# Create your views here.
def create_room(request):
    return render(request, 'create.html')

def join_room(request, room_id):
    return render(request, 'join.html', {'room_id':room_id})

def watch_room(request, room_id):
    return render(request, 'watch.html', {'room_id':room_id})