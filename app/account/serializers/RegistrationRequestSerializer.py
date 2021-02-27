from rest_framework import serializers
from django.contrib.auth.models import User

class RegistrationRequestSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()

    def validate_email(self, value):
        error = False
        try:
            user = User.objects.get(username=value)
            error = True
        except:
            pass
    
        if error:
            raise serializers.ValidationError("This username is already exists!!!")

        return value

    def save(self):
        username = self.validated_data['email']
        password = self.validated_data['password']
        user = User()
        user.username = username
        user.set_password(password)
        user.is_active = True
        user.is_staff = True
        user.is_superuser = True
        user.save()
        