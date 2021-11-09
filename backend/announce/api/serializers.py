from rest_framework import serializers
from announce.models import News

class AnnounceInfoRequestSerializer(serializers.Serializer):
    id = serializers.IntegerField()


class NewsSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = News
        fields = [
            'id',
            'audio_converted'
        ]
