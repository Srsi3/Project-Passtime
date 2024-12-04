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

urlpatterns = [
    path('admin/', admin.site.urls),
    path('wel/', ReactView.as_view(), name="something"),

    # If you have more URLs to add, use path() or re_path() here.
]


from rest_framework.routers import DefaultRouter
from .views import StudentViewSet, HallPassRequestViewSet

router = DefaultRouter()
router.register(r'students', StudentViewSet)
router.register(r'hallpass-requests', HallPassRequestViewSet)

urlpatterns = [
    # Other URLs...
] + router.urls
