from rest_framework import serializers
from article.models import Article


class ArticleShortSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Article
        fields = [
            'id',
            'title',
            'cover_url',
            'short_text'
        ]


class ArticleDetailSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Article
        fields = [
            'id',
            'title',
            'author',
            'text',
            'page',
            'image_url'
        ]



class ArticleRequestSerializer(serializers.Serializer):
    issue_id = serializers.IntegerField()

class ArticleDetailRequestSerializer(serializers.Serializer):
    article_id = serializers.IntegerField()