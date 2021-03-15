import django_filters
from journal.models import Journal


class JournalFilter(django_filters.FilterSet):
    name = django_filters.CharFilter(field_name="name", lookup_expr="contains")
    

    class Meta:
        model = Journal
        fields = ["name"]
