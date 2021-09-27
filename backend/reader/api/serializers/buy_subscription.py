from rest_framework import serializers

class BuySubsctiptionRequestSerializer(serializers.Serializer):
    issue_id = serializers.IntegerField()
    term = serializers.IntegerField()