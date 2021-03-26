from django.shortcuts import render
from announce.models import News
from django.http import Http404


def detail(request, slug):
    spl = slug.split('-')
    num = int(spl[len(spl)-1])
    try:
        item = News.objects.get(pk=num)
    except:
        raise Http404 
    return render(request, 'announce/detail.html', {"item": item})
