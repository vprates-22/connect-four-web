from django.db import models

class Rooms(models.Model):
    id = models.CharField(max_length=20, unique=True, primary_key=True)
    player_one = models.CharField(max_length=256)
    player_two = models.CharField(max_length=256, null=True)
    height = models.IntegerField()
    width = models.IntegerField()
    started = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    game_over = models.BooleanField(default=False)
    game_state = models.JSONField()