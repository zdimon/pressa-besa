from django.shortcuts import render
from journal.models import Journal, Issue
from .models import Category
from .utils import get_journal_type
from django.core.paginator import Paginator
from announce.models import News

def category_detail(request, journal_type, category):
    #new_issues = Issue.objects.filter(is_public=True).order_by('-id')[0:15]
    page = request.GET.get('page',1)
    news = News.objects.all().order_by('-id')[0:10]

    jtype = get_journal_type(journal_type)
    if jtype != 'all':
        journals_query = Journal.objects.filter(is_public=True, journal_type=jtype, last_issue_id__gt=0)
    else:
        journals_query = Journal.objects.filter(is_public=True, last_issue_id__gt=0)
    is_show_popular = True

    if category != 'all':
        category = Category.objects.get(name_slug=category)
        journals_query = journals_query.filter(is_public=True, category=category, last_issue_id__gt=0)
        is_show_popular = False
    else:
        category = {"name_slug": "all"}



        
    
    journals = journals_query.order_by('-last_issue_id')
    paginator = Paginator(journals, 16)
    page_obj = paginator.get_page(page)

    if journal_type == 'newspapers':
        popular = Journal.objects.filter(is_public=True,journal_type=jtype).order_by('-id')[0:15]
    else:
        popular = Journal.objects.filter(is_popular=True).order_by('-id')[0:15]
    categories = Category.objects.filter(show_in_new_catalog=True)
    return render(request, 'catalog/category_detail.html', {"journals": journals, "categories": categories, "popular": popular, 'journal_type': journal_type, "is_show_popular": is_show_popular, "category": category, "page_obj": page_obj, "jtype": jtype, 'news': news})
