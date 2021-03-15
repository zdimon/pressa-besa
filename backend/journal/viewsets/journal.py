from rest_framework import viewsets
from journal.models import Journal
from journal.serializers.journal import JournalSerializer
from journal.filters.journal import JournalFilter

class JournalViewSet(viewsets.ModelViewSet):
    queryset = Journal.objects.all()
    serializer_class = JournalSerializer
    filterset_class = JournalFilter
    search_fields = ['name']
