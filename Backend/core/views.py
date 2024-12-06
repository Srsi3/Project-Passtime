from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Student, HallPassRequest
from .serializer import StudentSerializer, HallPassRequestSerializer, CustomPasswordResetSerializer
from rest_framework import viewsets, status
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.decorators import action
from datetime import datetime, timedelta
# Create your views here.
# from .serializers import CustomPasswordResetSerializer
from dj_rest_auth.views import PasswordResetView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny
from rest_framework.authentication import SessionAuthentication, BasicAuthentication


class CustomPasswordResetView(APIView):
    serializer_class = CustomPasswordResetSerializer
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [AllowAny]  # Allows unauthenticated users to access the endpoint

    def post(self, request, *args, **kwargs):
        print("Request data:", request.data)  # Log incoming request data
        serializer = self.serializer_class(data=request.data)

        # Check if the serializer is valid
        if serializer.is_valid():
            # If valid, call save method to reset the password
            serializer.save()  
            return Response({"detail": "Password reset successful."}, status=status.HTTP_200_OK)

        # If validation fails, return the errors
        print("Validation errors:", serializer.errors)  # Log the validation errors
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from .models import Student, HallPassRequest, React
from .serializer import ReactSerializer, HallPassRequestSerializer, StudentSerializer

class ReactView(APIView):
    permission_classes = [AllowAny]
    serializer_class = ReactSerializer

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class HallPassRequestViewSet(viewsets.ModelViewSet):
    queryset = HallPassRequest.objects.all()
    serializer_class = HallPassRequestSerializer

    def create(self, request, *args, **kwargs):
        print("Received POST request.")
        serializer = HallPassRequestSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            print("Serializer is valid.")
            hall_pass_request = serializer.save()
            print("HallPassRequest instance saved:", hall_pass_request)

            if hall_pass_request.status == "pending":
                student_name = hall_pass_request.student.user.username
                class_name = hall_pass_request.student.class_name
                request_type = hall_pass_request.get_request_type_display()
                reason = hall_pass_request.reason or "No additional details"

                expiration_time = datetime.now() + timedelta(minutes=5)
                formatted_expiration = expiration_time.strftime("%H:%M")

                # Instead of printing the approve/reject endpoints, print a link to the homepage
                # with a query parameter for the request_id.
                homepage_link = f"http://127.0.0.1:3000/?request_id={hall_pass_request.id}"

                print("----- EMAIL OUTPUT START -----")
                print("Subject: Incoming Hall Pass Request")
                print("To: example@school.edu")
                print("From: no-reply@school.edu\n")
                print("Incoming Hall Pass Request")
                print(f"Student Name: {student_name}")
                print(f"Class Name: {class_name}")
                print(f"Request Type: {request_type}")
                print(f"Reason: {reason}")
                print(f"Expires At: {formatted_expiration}\n")
                print("Go to this link to view and manage the request:")
                print(homepage_link)
                print("----- EMAIL OUTPUT END -----")

            return Response(serializer.data, status=201)
        else:
            print("Invalid serializer.")
            return Response(serializer.errors, status=400)

    @action(detail=True, methods=['post'])
    def approve(self, request, pk=None):
        hall_pass_request = self.get_object()
        hall_pass_request.status = 'approved'
        hall_pass_request.save()
        return Response({'message': 'Hall Pass Request approved'}, status=status.HTTP_200_OK)

    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        hall_pass_request = self.get_object()
        hall_pass_request.status = 'rejected'
        hall_pass_request.save()
        return Response({'message': 'Hall Pass Request rejected'}, status=status.HTTP_200_OK)


def hallpass_list(request):
    hallpasses = HallPassRequest.objects.filter(status='pending')
    return render(request, 'hallpass_list.html', {'hallpasses': hallpasses})

def user_list(request):
    users = User.objects.all()
    return render(request, 'user_list.html', {'users': users})

