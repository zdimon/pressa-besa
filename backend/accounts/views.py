from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers.AuthRequestSerializer import AuthRequestSerializer
from .serializers.RegistrationRequestSerializer import RegistrationRequestSerializer
from .serializers.IsAuthRequestSerializer import IsAuthRequestSerializer
from drf_yasg.utils import swagger_auto_schema
from django.contrib.auth.models import User
from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.contrib.auth import logout
from django.shortcuts import redirect
from django.contrib.auth import login as l
from rest_framework.authtoken.models import Token


def preauth(request):
    token, created = Token.objects.get_or_create(user=request.user)
    return render(request, 'accounts/preauth.html', {'token': token})
    #return redirect('/')


def logout_view(request):
    logout(request)
    return redirect('/')

class LoginView(APIView):
    '''

     Login.

    '''
    permission_classes = (AllowAny,)

    @swagger_auto_schema(
        request_body=AuthRequestSerializer,
        responses={200: AuthRequestSerializer}
    )
    def post(self, request):
        payload = request.data
        # import pdb; pdb.set_trace()
        user = authenticate(username=payload['email'], password=payload['password'])

        if user is None:
            return Response({"status": 1,  "message": "User does not exist!"})
        else:
            token, created = Token.objects.get_or_create(user=user)
            l(request, user)
            return Response({"status": 0,  "message": "Ok", "token": token.key})
        # try:
        #     user = User.objects.get(username=payload['email'])
        # except ObjectDoesNotExist:
        #     return Response({"status": 1,  "message": "User does not exist!"})
        return Response({"message": "ok"})


class RegistrationView(APIView):
    '''

     registration.

    '''
    permission_classes = (AllowAny,)

    @swagger_auto_schema(
        request_body=RegistrationRequestSerializer,
        responses={200: RegistrationRequestSerializer}
    )
    def post(self, request):
        obj = RegistrationRequestSerializer(data=request.data)
        if obj.is_valid(raise_exception=True):
            obj.save()
        return Response({"message": "ok"})


class IsAuthView(APIView):
    '''

     Check authorization.

    '''
    permission_classes = (AllowAny,)

    @swagger_auto_schema(
        responses={200: IsAuthRequestSerializer}
    )
    def get(self, request):
        print(request.user)
        if request.user.is_authenticated:
            return Response({"status": 0})
        else:
            return Response({"status": 1})
        
