from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response

from rest_framework.authtoken.models import Token
from user.serializer import C4UserSerializer, C4User

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication, TokenAuthentication

from django.shortcuts import get_object_or_404

class Signup(APIView):
    def get(self, request):
        return Response({})
    
    def post(self, request):
        serializer = C4UserSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            user = C4User.objects.get(email = request.data["email"])
            user.set_password(request.data["password"])
            user.save()
            token = Token.objects.create(user = user)
            return Response({"token" : token.key, "user" : serializer.data})
        return Response({"status" : "email already in use"}, status = status.HTTP_409_CONFLICT)
    
class LogIn(APIView):
    def get(self, request):
        return Response({})
    
    def post(self, request):
        user = get_object_or_404(C4User, email = request.data["email"])
        if not user.check_password(request.data["password"]):
            return Response({ "status" : "wrong password"}, status=status.HTTP_401_UNAUTHORIZED)
        token, created = Token.objects.get_or_create(user = user)
        serializer = C4UserSerializer(instance = user)
        return Response({"token" : token.key, "user" : serializer.data})
    
class Test(APIView):
    authentication_classes = [SessionAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"You" : f"Are Auth {request.user.email}"})