from django.shortcuts import render
from journal.models import Journal, Issue
from .models import Category

def category_detail(request, journal_type, category):
    #new_issues = Issue.objects.filter(is_public=True).order_by('-id')[0:15]
    journals = Journal.objects.all().order_by('-last_issue_id')[0:15]
    popular = Journal.objects.filter(is_popular=True).order_by('-id')[0:15]
    categories = Category.objects.all()
    return render(request, 'catalog/category_detail.html', {"journals": journals, "categories": categories, "popular": popular})
