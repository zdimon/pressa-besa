from rest_framework import viewsets
from journal.models import Journal
from journal.serializers.car import JournalSerializer
#from driver.filters.car import CarFilter

class JournalViewSet(viewsets.ModelViewSet):
    queryset = Journal.objects.all()
    serializer_class = journalSerializer
    #filterset_class = CarFilter
    search_fields = ['name','id']