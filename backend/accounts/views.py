from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth import login as auth_login, logout as auth_logout, authenticate
from django.contrib.auth.forms import AuthenticationForm
from rest_framework import generics
from .serializers import RegisterSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
def check_authentication_status(request):
    """Check if the user is authenticated."""
    is_authenticated = request.user.is_authenticated
    username = request.user.username if is_authenticated else None
    return Response({'isAuthenticated': is_authenticated, 'username': username})

@ensure_csrf_cookie
def set_csrf_token(request):
    """Sets the CSRF token."""
    return JsonResponse({"message": "CSRF token set"})

class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

class LoginView(APIView):
    def post(self, request):
        """Handles user login."""
        username = request.data.get("username")
        password = request.data.get("password")

        if not username or not password:
            return Response(
                {"error": "Username and password are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = authenticate(request, username=username, password=password)
        if user:
            auth_login(request, user)
            return Response(
                {"message": "Login successful.", "username": user.username},
                status=status.HTTP_200_OK,
            )
        return Response(
            {"error": "Invalid username or password."},
            status=status.HTTP_403_FORBIDDEN,
        )

class LogoutView(APIView):
    def post(self, request):
        """Handles user logout."""
        auth_logout(request)
        return Response({"message": "Logout successful."}, status=status.HTTP_200_OK)
