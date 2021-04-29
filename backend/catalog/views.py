from django.shortcuts import render
from journal.models import Journal
from .models import Category

def category_detail(request, journal_type, category):
    journals = Journal.objects.all().order_by('-id')[0:15]
    popular = Journal.objects.filter(is_popular=True).order_by('-id')[0:15]
    categories = Category.objects.all()
    return render(request, 'catalog/category_detail.html', {"journals": journals, "categories": categories, "popular": popular})
