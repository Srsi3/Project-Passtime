

from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Student, HallPassRequest
from .serializer import StudentSerializer, HallPassRequestSerializer
from django.contrib.auth.models import User
from .serializer import *
from core.utils import send_email  # Import the email utility function
from datetime import datetime, timedelta
# Create your views here.

class ReactView(APIView):
    serializer_class = ReactSerializer

    def get(self, request):
        detail = [
            {"name": detail.name, "detail": detail.detail}
            for detail in React.objects.all()
        ]
        return Response(detail)

    def post(self, request):
        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()

            expiration_time = datetime.now() + timedelta(minutes=5)
            formatted_expiration = expiration_time.strftime("%H:%M")

        

            # Email logic: Send an email notification after saving
            subject = "Incoming Hall Pass Request"
            message_body = f"""
            <html>
            <head>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                    .container {{ max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px; }}
                    .header {{ background-color: #007BFF; color: white; text-align: center; padding: 10px 0; border-radius: 5px 5px 0 0; }}
                    .content {{ padding: 20px; }}
                    .footer {{ text-align: center; font-size: 0.9em; color: #777; }}
                    .timer {{ margin-top: 10px; font-weight: bold; }}
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h2>Incoming Hall Pass Request</h2>
                    </div>
                    <div class="content">
                        <p><strong>Student Name:</strong> {serializer.data.get('name')}</p>
                        <p><strong>Destination:</strong> {serializer.data.get('destination', 'Not provided')}</p>
                        <p><strong>Additional Details:</strong> {serializer.data.get('details', 'No additional details')}</p>
                        <div class="timer">
                            <strong>Time Remaining:</strong> This pass expires at <span>{formatted_expiration}</span>
                            
                        </div>
                    </div>
                    <div class="footer">
                        <p>This is an automated notification from the PassTime application.</p>
                    </div>
                </div>
            </body>
            </html>
            """
            to_email = "myao1@ufl.edu"  # Replace with the recipient's email

            # Call the send_email function
            status = send_email(to_email, subject, message_body)

            # Log email status
            if status == 202:  # Success
                print("Email sent successfully!")
            else:
                print("Failed to send email.")

            return Response(serializer.data)


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

