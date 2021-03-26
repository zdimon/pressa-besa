from django.shortcuts import render
from journal.models import Journal
from announce.models import News


def index(request):
    popular_journal = Journal.objects.filter(is_popular=True).order_by('position_popular')
    books = Journal.objects.filter(show_in_books=True)[0:10]
    news = News.objects.all().order_by('-id')[0:10]
    data = {
            "popular_journal": popular_journal,
            "news": news,
            "books": books
           }
    return render(request, 'main/index.html', data)
