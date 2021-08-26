from rest_framework import serializers
from subscribe.models import Subscription


class RequestAddSubscribeSerializer(serializers.Serializer):
    days = serializers.IntegerField()