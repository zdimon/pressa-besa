from rest_framework import serializers
from announce.models import News

class AnnounceInfoRequestSerializer(serializers.Serializer):
    id = serializers.IntegerField()


class AnnounceSubscribeRequestSerializer(serializers.Serializer):
    email = serializers.CharField()


class NewsSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = News
        fields = [
            'id',
            'audio_converted'
        ]
