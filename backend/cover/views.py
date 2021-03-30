from sorl.thumbnail import get_thumbnail
from django.http import HttpResponsePermanentRedirect
from django.http import HttpResponse
from catalog.models import Category
from journal.models import Journal, Issue
from django.conf import settings


def make_cover(request, obj, size, id):
    size = size.replace('-', 'x')
    def_cover = f'{settings.BACKEND_URL}/static/images/default_cover.jpg'
    if(obj == 'category'):
        cat = Category.objects.get(pk=id)
        im = get_thumbnail(cat.cover_journal().cover, size, crop='top')
    elif(obj == 'journal'):
        j = Journal.objects.get(pk=id)
        try:
            im = get_thumbnail(j.last_issue.cover, size, crop='top')
        except Exception as e:
            return HttpResponsePermanentRedirect(def_cover)
    elif(obj == 'issue'):
        try:
            i = Issue.objects.get(pk=id)
        except Exception as e:
            return HttpResponsePermanentRedirect(def_cover)
        try:
            if size == '260x340' and i.journal.cover_size != '':
                size = i.journal.cover_size.replace('-', 'x')
            im = get_thumbnail(i.cover, size, crop='top')
        except Exception as e:
            print(i.cover)
            return HttpResponse(str(e)+size)
    u = '%s%s' % (settings.BACKEND_URL, im.url)
    return HttpResponsePermanentRedirect(u)
