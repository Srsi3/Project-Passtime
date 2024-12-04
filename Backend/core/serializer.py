from rest_framework import serializers
from . models import *
from .models import PassRequest

class ReactSerializer(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ['name', 'detail']

class PassRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = PassRequest
        fields = '__all__'
