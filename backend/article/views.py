from django.shortcuts import render
from .models import ArticleCoverSetting, Article, ArticleImages
from .utils import make_cover
from journal.models import Issue
from django.db.models import Exists, OuterRef


def article_list(request):
    arts = Article.objects.filter(
        Exists(ArticleImages.objects.filter(article=OuterRef('pk')))
    ).order_by('-id')[0:30]
    return render(request, 'article/article_list.html', {'arts': arts})


def article_detail(request, id):
    object = Article.objects.get(pk=id)
    other = Article.objects.filter(issue=object.issue).exclude(pk=object.pk)
    issues = Issue.objects.filter(journal=object.issue.journal).exclude(pk=object.issue.id).order_by('-id')[0:10]
    return render(request, 'article/article_detail.html', {'item': object, 'other': other, 'issues': issues})


def test_cover(request, id):
    conf = ArticleCoverSetting.objects.get(pk=id)
    art = Article.objects.all()[0]
    make_cover(art, conf, 'test.png')
    return render(request, 'test_cover.html')
