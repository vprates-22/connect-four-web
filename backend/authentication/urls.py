from django.urls import path, include
from authentication.views import Signup, LogIn, Test

urlpatterns = [
    path('signup', Signup.as_view()),
    path('login', LogIn.as_view()),
    path('test', Test.as_view()),
]