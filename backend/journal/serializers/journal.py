from rest_framework import serializers
from journal.models import Journal


class JournalSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Journal
        fields = [
            'id',
            'name',
            'image_url'
        ]