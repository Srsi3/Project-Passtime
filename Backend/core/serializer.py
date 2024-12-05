from rest_framework import serializers
from . models import *

class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ['name', 'detail']

from rest_framework import serializers
from .models import Student, HallPassRequest

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['user', 'class_name', 'student_id']

class HallPassRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = HallPassRequest
        fields = ['id', 'student', 'request_type', 'start_time', 'end_time', 'reason', 'status']
