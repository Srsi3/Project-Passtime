from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
# Create your views here.

class ReactView(APIView):
  
    serializer_class = ReactSerializer

    def get(self, request):
        detail = [ {"name": detail.name,"detail": detail.detail} 
        for detail in React.objects.all()]
        return Response(detail)

    def post(self, request):

        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return  Response(serializer.data)

from django.shortcuts import render
from .models import HallPassRequest

def hallpass_list(request):
    hallpasses = HallPassRequest.objects.filter(status='pending')
    return render(request, 'hallpass_list.html', {'hallpasses': hallpasses})

from rest_framework import viewsets
from .models import Student, HallPassRequest
from .serializers import StudentSerializer, HallPassRequestSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class HallPassRequestViewSet(viewsets.ModelViewSet):
    queryset = HallPassRequest.objects.all()
    serializer_class = HallPassRequestSerializer


#template stuff
<ul>
    {% for pass in hallpasses %}
    <li>{{ pass.student.user.username }} - {{ pass.request_type }} - {{ pass.status }}</li>
    {% endfor %}
</ul>
=======
# views.py
from django.contrib.auth.models import User
from django.shortcuts import render

def user_list(request):
    users = User.objects.all()  # Fetch all users
    return render(request, 'user_list.html', {'users': users})
