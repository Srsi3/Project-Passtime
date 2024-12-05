# from django.shortcuts import render
# from rest_framework.views import APIView
# from . models import *
# from rest_framework.response import Response
# from . serializer import *
# # Create your views here.

# class ReactView(APIView):
  
#     serializer_class = ReactSerializer

#     def get(self, request):
#         detail = [ {"name": detail.name,"detail": detail.detail} 
#         for detail in React.objects.all()]
#         return Response(detail)

#     def post(self, request):

#         serializer = ReactSerializer(data=request.data)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             return  Response(serializer.data)

from django.shortcuts import render
from rest_framework.views import APIView
from .models import *
from rest_framework.response import Response
from .serializer import *
from core.utils import send_email  # Import the email utility function

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

            # Email logic: Send an email notification after saving
            subject = "New React Object Created"
            message_body = f"A new React object has been created:\n\n{serializer.data}"
            to_email = "myao1@ufl.edu"  # Replace with the recipient's email

            # Call the send_email function
            status = send_email(to_email, subject, message_body)

            # Log email status
            if status == 202:  # Success
                print("Email sent successfully!")
            else:
                print("Failed to send email.")

            return Response(serializer.data)

