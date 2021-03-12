from rest_framework import viewsets
from journal.models import Journal
from journal.serializers.journal import JournalSerializer


class JournalViewSet(viewsets.ModelViewSet):
    queryset = Journal.objects.all()
    serializer_class = JournalSerializer
    search_fields = ['id', 'name']