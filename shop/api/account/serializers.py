from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from rest_framework_simplejwt.models import TokenUser

from .models import *


class AuthenticationSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['first_name'] = user.first_name
        token['last_name'] = user.last_name
        token['phone'] = str(user.phone)
        return token
    

class SignUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ['first_name', 'last_name', 'email', 'phone', 'password']
        
    def create(self, validated_data):
        return Account.objects.create_user(**validated_data)
    
    
class UpdateProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields =  ['first_name',  'last_name', 'phone', 'email']
        
    