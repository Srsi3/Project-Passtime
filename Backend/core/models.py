from django.db import models 
# Create your models here.
from django.db import models
from django.contrib.auth import get_user_model
class React(models.Model):
    name = models.CharField(max_length=30)
    detail = models.CharField(max_length=500)

    from django.db import models


User = get_user_model()

class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='student_profile')
    class_name = models.CharField(max_length=50)  # e.g., "Grade 10 - A"
    student_id = models.CharField(max_length=20, unique=True)  # Unique identifier for students

    def __str__(self):
        return f"{self.user.username} ({self.class_name})"

class HallPassRequest(models.Model):
    REQUEST_OPTIONS = [
        ('bathroom', 'Bathroom'),
        ('nurse', 'Nurse'),
        ('office', 'Office'),
        ('other', 'Other'),
    ]

    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    request_type = models.CharField(max_length=20, choices=REQUEST_OPTIONS, default='bathroom')
    start_time = models.DateTimeField(auto_now_add=True)
    end_time = models.DateTimeField(null=True, blank=True)
    reason = models.TextField(blank=True)  # Optional field for additional context

    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    ]

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    
    def approve(self):
        self.status = 'approved'
        self.save()

    def reject(self):
        self.status = 'rejected'
        self.save()

    def __str__(self):
        return f"{self.request_type} request by {self.student.user.username} - {self.status}"
