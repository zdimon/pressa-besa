from rest_framework import serializers

class IssueRequestSerializer(serializers.Serializer):
    issue_id = serializers.IntegerField()
   