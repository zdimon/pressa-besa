from django.shortcuts import render
from .models import ArticleCoverSetting, Article
from .utils import make_cover


def article_list(request):
    arts = Article.objects.all().order_by('-id')[0:10]
    print(arts)
    return render(request, 'article/article_list.html', {'arts': arts})


def test_cover(request, id):
    conf = ArticleCoverSetting.objects.get(pk=id)
    art = Article.objects.all()[0]
    make_cover(art, conf, 'test.png')
    return render(request, 'test_cover.html')
