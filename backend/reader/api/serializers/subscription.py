from rest_framework import serializers
from subscribe.models import Subscription


class SubscriptionSerializer(serializers.ModelSerializer):
    desc = serializers.SerializerMethodField()
   
    def get_desc(self, obj):
        return str(obj)

    class Meta:
        model = Subscription
        fields = [
            'id',
            'count',
            'months',
            'cost',
            'desc'
        ]