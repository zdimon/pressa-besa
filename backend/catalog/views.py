from django.shortcuts import render
from journal.models import Journal, Issue
from .models import Category
from .utils import get_journal_type
from django.core.paginator import Paginator

def category_detail(request, journal_type, category):
    #new_issues = Issue.objects.filter(is_public=True).order_by('-id')[0:15]
    page = request.GET.get('page',1)
    

    jtype = get_journal_type(journal_type)
    if jtype != 'all':
        journals_query = Journal.objects.filter(journal_type=jtype)
    else:
        journals_query = Journal.objects.all()
    is_show_popular = True

    if category != 'categories':
        category = Category.objects.get(name_slug=category)
        journals_query = journals_query.filter(category=category)
        is_show_popular = False
    else:
        category = 'categories'



        
    
    journals = journals_query.order_by('-last_issue_id')
    paginator = Paginator(journals, 15)
    page_obj = paginator.get_page(page)

    
    popular = Journal.objects.filter(is_popular=True).order_by('-id')[0:15]
    categories = Category.objects.filter(show_in_new_catalog=True)
    return render(request, 'catalog/category_detail.html', {"journals": journals, "categories": categories, "popular": popular, 'journal_type': journal_type, "is_show_popular": is_show_popular, "category": category, "page_obj": page_obj, "jtype": jtype})
