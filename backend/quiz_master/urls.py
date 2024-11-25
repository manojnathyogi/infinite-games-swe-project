"""
URL configuration for quiz_master project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# backend/quiz_master/urls.py

from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse

def home_view(request):
    return HttpResponse("Welcome to Quiz Master Backend!")

urlpatterns = [
    # path('', main_views.homepage),
    path('admin/', admin.site.urls),
    path('quiz/', include('quiz.urls')),  # Include the quiz app URLs
    path('accounts/', include('accounts.urls')),  # Include the accounts app URLs
    path('', home_view, name='home'),  # Default route
]