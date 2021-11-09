from rest_framework import serializers
from article.models import Article


class ArticleInfoRequestSerializer(serializers.Serializer):
    id = serializers.IntegerField()


class ArticleSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = Article
        fields = [
            'id',
            'audio_converted'
        ]
