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
        extra_kwargs = {
            'student': {'required': False}  # Make sure the student field is not required
        }

    def create(self, validated_data):
        user = self.context['request'].user

        student, created = Student.objects.get_or_create(user=user)

        validated_data['student'] = student
        return super().create(validated_data)


class HallPassRequestViewSet(viewsets.ModelViewSet):
    queryset = HallPassRequest.objects.all()
    serializer_class = HallPassRequestSerializer

    @action(detail=True, methods=['patch'])
    def cancel_request(self, request, pk=None):
        hall_pass_request = self.get_object()
        hall_pass_request.status = 'canceled'
        hall_pass_request.save()
        return Response({'status': 'Request canceled'})

    @action(detail=True, methods=['post'])
    def submit_request(self, request, pk=None):
        user = request.user  # The user making the request
        
        # Check if the user already has an associated student object
        student = user.student if hasattr(user, 'student') else None

        # If no student exists, create one
        if not student:
            student = Student.objects.create(
                user=user,  # The user making the request
                class_name="Test Class",  # Default or dummy class name
                student_id=user.id  # Use user ID as the student ID or generate one
            )

        reason = request.data.get('reason')
        location = request.data.get('location')

        # Create the hall pass request
        hall_pass_request = HallPassRequest.objects.create(
            student=student,
            request_type=location,
            reason=reason,
            start_time=datetime.now(),
            status='pending'
        )

        # Return the serialized data of the created hall pass request
        return Response(self.get_serializer(hall_pass_request).data)
