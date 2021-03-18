from django.shortcuts import render
from .models import ArticleCoverSetting, Article
from .utils import make_cover


def test_cover(request, id):
    conf = ArticleCoverSetting.objects.get(pk=id)
    art = Article.objects.all()[0]
    make_cover(art, conf, 'test.png')
    return render(request, 'test_cover.html')
