from rest_framework.serializers import ModelSerializer, CharField
from user.models import C4User

class C4UserSerializer(ModelSerializer):
    password = CharField(write_only = True)

    class Meta:
        model = C4User
        fields = ("email", "username", "password")