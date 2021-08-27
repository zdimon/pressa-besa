import django_filters

from journal.models import IssuePage


class PagesFilter(django_filters.FilterSet):

    class Meta:
        model = IssuePage
        fields = ["paper"]