from rest_framework import serializers


class AuthRequestSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()