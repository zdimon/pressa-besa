from rest_framework import serializers

class IsAuthRequestSerializer(serializers.Serializer):
    token = serializers.CharField()
    status = serializers.IntegerField()