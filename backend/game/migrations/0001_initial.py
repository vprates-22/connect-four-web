# Generated by Django 5.1.1 on 2024-10-28 21:03

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Rooms',
            fields=[
                ('id', models.CharField(max_length=20, primary_key=True, serialize=False, unique=True)),
                ('player_one', models.CharField(max_length=256)),
                ('player_two', models.CharField(max_length=256, null=True)),
                ('height', models.IntegerField()),
                ('width', models.IntegerField()),
                ('started', models.BooleanField(default=False)),
                ('active', models.BooleanField(default=True)),
                ('game_over', models.BooleanField(default=False)),
                ('game_state', models.JSONField()),
            ],
        ),
    ]
