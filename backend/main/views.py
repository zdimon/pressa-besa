from django.shortcuts import render
from journal.models import Journal


def index(request):
    popular_journal = Journal.objects.filter(is_popular=True).order_by('position_popular')
    data = {
            "popular_journal": popular_journal
           }
    return render(request, 'main/index.html', data)
