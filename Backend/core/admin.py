from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Student, HallPassRequest

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ('user', 'class_name', 'student_id')

@admin.register(HallPassRequest)
class HallPassRequestAdmin(admin.ModelAdmin):
    list_display = ('student', 'request_type', 'status', 'start_time')
    list_filter = ('status',)
