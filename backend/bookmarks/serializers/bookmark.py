from rest_framework import serializers
from bookmarks.models import Bookmarks


class RequestBookmarksSerializer(serializers.Serializer):
    article_id = serializers.IntegerField(required=False)
    issue_id = serializers.IntegerField(required=False)
    page_id = serializers.IntegerField(required=False)
    type = serializers.CharField()


class BookmarksSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Bookmarks
        fields = [
            'id',
            'issue',
            'page'
        ]