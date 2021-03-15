from rest_framework import viewsets
from article.models import Article
from article.serializers.article import ArticleSerializer
#from journal.filters.journal import JournalFilter

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    #filterset_class = JournalFilter
    #search_fields = ['name']
