from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from journal.models import Issue, IssuePage
from django.http import Http404
# Create your views here.


def reader_index(request, issue_id):
    try:
        issue = Issue.objects.get(pk=issue_id)
    except ObjectDoesNotExist:
        raise Http404
    pages = IssuePage.objects.filter(paper=issue)
    cnt = {"issue": issue, "pages": pages}
    return render(request,'reader/index.html', cnt)