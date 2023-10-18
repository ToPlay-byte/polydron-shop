from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator

from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.generics import CreateAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .serializers import AuthenticationSerializer, SignUpSerializer, UpdateProfileSerializer 
from .models import Account, CustomRefreshToken


class AuthenticationAPIView(TokenObtainPairView):
    serializer_class = AuthenticationSerializer

    
class ProfileModelViewSet(ModelViewSet):
    
    
    def update(self, request,  *args, **kwargs):
        user = Account.objects.get(email=request.user.email)
        serializer = UpdateProfileSerializer(instance=user, data=request.data, context={'request': request})
 
        if serializer.is_valid():
            self.perform_update(serializer)
            refresh = CustomRefreshToken.for_user(user)
            return Response({'refresh': str(refresh), 'access': str(refresh.access_token)})
        return Response(serializer.errors, status=status.HTTP_502_BAD_GATEWAY)
            
    def create(self, request, *args, **kwargs):
        serializer = SignUpSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_502_BAD_GATEWAY)
        
        serializer.save()
        return Response(serializer.data)
    
    
@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
    def get(self, request):
        return Response({'success': 'get CSRF token'})
    
    
    
class IsAccountExisctsAPIView(APIView):
    def post(self, request, *args, **kwargs):
        isExits = Account.objects.filter(email=request.data['email'])
        if isExits:
            return Response({'email:' 'Користувач с такою електроною поштою'}, status=status.HTTP_502_BAD_GATEWAY()) 
        return Response() 
        
