from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import React, HallPassRequest, Student
from .serializer import ReactSerializer, HallPassRequestSerializer, StudentSerializer
from core.utils import send_email  # Import the email utility function
from datetime import datetime, timedelta
from rest_framework.permissions import AllowAny

class ReactView(APIView):
    permission_classes = [AllowAny]  # This view can be accessed by anyone
    serializer_class = ReactSerializer

  
# ViewSets for API-based interactions
from rest_framework import viewsets

class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class HallPassRequestViewSet(viewsets.ModelViewSet):
    queryset = HallPassRequest.objects.all()
    print('made it')
    serializer_class = HallPassRequestSerializer
    print('made it here')


    def get(self, request):
        # Fetch all React objects
        detail = [
            {"name": detail.name, "detail": detail.detail}
            for detail in React.objects.all()
        ]
        return Response(detail)

    def create(self, request):
        print("Received POST request.")  # Debug log
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            print("Serializer is valid.")  # Debug log
            react_instance = serializer.save()  # Save the React instance
            print("React instance saved:", react_instance)  # Debug log

            # Fetch a related HallPassRequest dynamically
            hall_pass_request = HallPassRequest.objects.filter(status="pending").first()
            if not hall_pass_request:
                print("No pending Hall Pass Request found.")  # Debug log
                return Response({"error": "No pending Hall Pass Request found"}, status=400)

            print("Found HallPassRequest:", hall_pass_request)  # Debug log

            # Retrieve related data for the email
            student_name = hall_pass_request.student.user.username
            class_name = hall_pass_request.student.class_name
            request_type = hall_pass_request.get_request_type_display()
            reason = hall_pass_request.reason or "No additional details"

            print(f"Preparing email for {student_name}.")  # Debug log

            # Set expiration time
            expiration_time = datetime.now() + timedelta(minutes=5)
            formatted_expiration = expiration_time.strftime("%H:%M")

            # Email logic
            subject = "Incoming Hall Pass Request"
            message_body = f"""
            <html>
            <body>
            <h2>Incoming Hall Pass Request</h2>
            <p><strong>Student Name:</strong> {student_name}</p>
            <p><strong>Class Name:</strong> {class_name}</p>
            <p><strong>Request Type:</strong> {request_type}</p>
            <p><strong>Reason:</strong> {reason}</p>
            <p><strong>Expires At:</strong> {formatted_expiration}</p>
            </body>
            </html>
            """
            print("Calling send_email function.")  # Debug log
            to_email = "myao1@ufl.edu"  # Replace with the recipient's email

            # Call the send_email function
            status = send_email(to_email, subject, message_body)

            # Log email status
            if status == 202:  # Success
                print("Email sent successfully!")
            else:
                print("Failed to send email.")

            return Response(serializer.data)

        else:
            print("Invalid serializer.")  # Debug log
            return Response(serializer.errors, status=400)



# Traditional Django Views for rendering templates
def hallpass_list(request):
    hallpasses = HallPassRequest.objects.filter(status='pending')
    return render(request, 'hallpass_list.html', {'hallpasses': hallpasses})

def user_list(request):
    users = User.objects.all()  # Fetch all users
    return render(request, 'user_list.html', {'users': users})
