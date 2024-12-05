"""
URL configuration for Backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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
from django.contrib import admin

from django.urls import path, re_path  # Keep these imports
from core.views import *  # Adjust based on your view imports
from core.views import ReactView
from django.urls import path, include  # Add include here
from core.views import user_list  # Import the user_list view
from rest_framework.routers import DefaultRouter
from core.views import StudentViewSet, HallPassRequestViewSet
from core.views import StudentViewSet, HallPassRequestViewSet
router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'hallpass-requests', HallPassRequestViewSet)

urlpatterns = [
    # Other URLs...

    #path('wel/', ReactView.as_view(), name="something"),
#   path('admin/', admin.site.urls),
#   path('wel/', ReactView.as_view(), name="something"),
    path('auth/', include('dj_rest_auth.urls')),  # Login, logout, password reset, etc.
    path('auth/registration/', include('dj_rest_auth.registration.urls')),  # Registration
    path('users/', user_list, name='user_list'), 

] + router.urls
    #path('wel/', ReactView.as_view(), name="something"),
   # Add this line
    # Add other URL patterns below as needed

