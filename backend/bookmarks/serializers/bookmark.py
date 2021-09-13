from rest_framework import serializers
from bookmarks.models import Bookmarks


class RequestBookmarksSerializer(serializers.Serializer):
    article_id = serializers.IntegerField()
    page_id = serializers.IntegerField()


class BookmarksSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Bookmarks
        fields = [
            'id',
            'issue',
            'page'
        ]