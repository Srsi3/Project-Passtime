from rest_framework import serializers, viewsets
from .models import *
from rest_framework import serializers
from .models import Student, HallPassRequest
from dj_rest_auth.serializers import PasswordResetSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework.response import Response
from datetime import datetime

class CustomPasswordResetSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)  # Ensure username is provided
    password = serializers.CharField(write_only=True, required=True)  # Ensure password is provided

    def validate(self, attrs):
        print("Received payload:", attrs)  # Log incoming data
        
        username = attrs.get('username')
        password = attrs.get('password')

        # Ensure the username is provided
        if not username:
            raise serializers.ValidationError("Username is required.")
        
        # Ensure the password is provided
        if not password:
            raise serializers.ValidationError("Password is required.")
        
        # Check if the user exists
        try:
            self.user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this username does not exist.")
        
        return attrs

    def save(self):
        # Update the password
        password = self.validated_data['password']
        self.user.set_password(password)  # Reset the password
        self.user.save()  # Save the user with the updated password
        return self.user
class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ['name', 'detail']

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['user', 'class_name', 'student_id']

class HallPassRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = HallPassRequest
        fields = ['id', 'student', 'request_type', 'start_time', 'end_time', 'reason', 'status']


from rest_framework import serializers, viewsets
from .models import *
from rest_framework import serializers
from .models import Student, HallPassRequest
from dj_rest_auth.serializers import PasswordResetSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import action
from rest_framework.response import Response
from datetime import datetime

class CustomPasswordResetSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)  # Ensure username is provided
    password = serializers.CharField(write_only=True, required=True)  # Ensure password is provided

    def validate(self, attrs):
        print("Received payload:", attrs)  # Log incoming data
        
        username = attrs.get('username')
        password = attrs.get('password')

        # Ensure the username is provided
        if not username:
            raise serializers.ValidationError("Username is required.")
        
        # Ensure the password is provided
        if not password:
            raise serializers.ValidationError("Password is required.")
        
        # Check if the user exists
        try:
            self.user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this username does not exist.")
        
        return attrs

    def save(self):
        # Update the password
        password = self.validated_data['password']
        self.user.set_password(password)  # Reset the password
        self.user.save()  # Save the user with the updated password
        return self.user
