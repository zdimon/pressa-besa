from rest_framework import serializers
from journal.models import IssuePage


class PageSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = IssuePage
        fields = [
            'id',
            'page',
            'file_low',
            'file_middle'
        ]


class PageRequestSerializer(serializers.Serializer):
    issue_id = serializers.IntegerField()
