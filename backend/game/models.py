from django.db import models

class Rooms(models.Model):
    id = models.CharField(max_length=20, unique=True, primary_key=True)
    player_one = models.TextField()
    player_two = models.TextField(null=True)
    height = models.IntegerField()
    width = models.IntegerField()
    started = models.BooleanField(default=False)
    active = models.BooleanField(default=True)