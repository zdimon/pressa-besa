from django.shortcuts import render
from journal.models import Journal, Issue
from announce.models import News
from django.views.generic import DetailView
from django.http import Http404


def index(request):
    popular_journal = Journal.objects.filter(is_popular=True).order_by('position_popular')
    books = Journal.objects.filter(show_in_books=True)[0:10]
    new = Journal.objects.filter(is_new=True)[0:10]
    
    news = News.objects.all().order_by('-id')[0:10]
    print(news)
    data = {
            "popular_journal": popular_journal,
            "news": news,
            "books": books,
            "new": new
           }
    return render(request, 'main/index.html', data)


def search(request):
    key = request.GET.get('key','')
    items = Journal.objects.filter(name__icontains=key)[0:15]
    return render(request, 'main/search.html', {"items": items,  "key": key})


class JournalBuyView(DetailView):
    model = Issue
    template_name = 'billing/buy_issue.html'

    def get_object(self):
        try:
            return Issue.objects.select_related('journal').get(
                name_slug=self.kwargs['issue_name_slug'],
                is_public=True,
                journal__name_slug=self.kwargs['name_slug'])
        except:
            try:
                return Issue.objects.select_related('journal').get(
                    id=self.kwargs['issue_name_slug'],
                    is_public=True,
                    journal__name_slug=self.kwargs['name_slug'])    
            except:
                raise Http404