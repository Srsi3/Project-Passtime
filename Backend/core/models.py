from datetime import timezone
from django.db import models 
from django.contrib.auth.models import User
# Create your models here.
class React(models.Model):
    name = models.CharField(max_length=30)
    detail = models.CharField(max_length=500)
# myapp/models.py

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Additional fields if needed

class Teacher(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # Additional fields if needed

class PassRequest(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    teacher = models.ForeignKey(Teacher, on_delete=models.CASCADE)
    request_time = models.DateTimeField(auto_now_add=True)
    approved = models.BooleanField(default=False)
    approval_time = models.DateTimeField(null=True, blank=True)

    def approve(self):
        self.approved = True
        self.approval_time = timezone.now()
        self.save()
