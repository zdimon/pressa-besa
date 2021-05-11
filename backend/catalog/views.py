from django.shortcuts import render
from journal.models import Journal, Issue
from .models import Category
from .utils import get_journal_type

def category_detail(request, journal_type, category):
    #new_issues = Issue.objects.filter(is_public=True).order_by('-id')[0:15]
    print(journal_type)
    journals = Journal.objects.filter(journal_type=get_journal_type(journal_type)).order_by('-last_issue_id')[0:15]
    popular = Journal.objects.filter(is_popular=True).order_by('-id')[0:15]
    categories = Category.objects.filter(show_in_new_catalog=True)
    return render(request, 'catalog/category_detail.html', {"journals": journals, "categories": categories, "popular": popular})
