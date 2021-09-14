from rest_framework import serializers
from journal.models import Issue


class IssueSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Issue
        fields = [
            'id',
            'name',
            'common_cover'
        ]