from django.urls import path
from .views import set_csrf_token, LoginView, LogoutView, RegisterView, check_authentication_status

urlpatterns = [
    path("csrf/", set_csrf_token, name="set_csrf_token"),
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    path('register/', RegisterView.as_view(), name='register'),
    path("auth-status/", check_authentication_status, name="auth_status"),
]
