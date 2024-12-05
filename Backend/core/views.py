from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
from rest_framework import viewsets
from .models import Student, HallPassRequest
from .serializer import StudentSerializer, HallPassRequestSerializer
from django.contrib.auth.models import User



def hallpass_list(request):
    hallpasses = HallPassRequest.objects.filter(status='pending')
    return render(request, 'hallpass_list.html', {'hallpasses': hallpasses})

def user_list(request):
    users = User.objects.all()  # Fetch all users
    return render(request, 'user_list.html', {'users': users})


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class HallPassRequestViewSet(viewsets.ModelViewSet):
    queryset = HallPassRequest.objects.all()
    serializer_class = HallPassRequestSerializer

