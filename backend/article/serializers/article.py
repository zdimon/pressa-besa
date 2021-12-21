from rest_framework import serializers
from article.models import Article


class ArticleSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Article
        fields = [
            'id',
            'title',
            'cover_url',
            'short_text',
            'issue_number'
        ]