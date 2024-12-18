from django.db import models

class Rooms(models.Model):
    id = models.CharField(max_length=20, unique=True, primary_key=True)
    multiplayer = models.BooleanField(null=False)
    player_one_email = models.CharField(max_length=256)
    player_one_username = models.CharField(max_length=256)
    player_two_email = models.CharField(max_length=256, null=True)
    player_two_username = models.CharField(max_length=256, null=True)
    height = models.IntegerField()
    width = models.IntegerField()
    started = models.BooleanField(default=False)
    active = models.BooleanField(default=True)
    game_over = models.BooleanField(default=False)
    game_state = models.JSONField()