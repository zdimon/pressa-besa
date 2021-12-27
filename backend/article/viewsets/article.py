from rest_framework import viewsets
from article.models import Article
from article.serializers.article import ArticleSerializer
#from journal.filters.journal import JournalFilter
from rest_framework.permissions import AllowAny
from rest_framework import viewsets, mixins

'''
class ModelViewSet(mixins.CreateModelMixin, 
                   mixins.RetrieveModelMixin, 
                   mixins.UpdateModelMixin,
                   mixins.DestroyModelMixin,
                   mixins.ListModelMixin,
                   GenericViewSet)
'''

class ArticleViewSet( mixins.ListModelMixin, viewsets.GenericViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (AllowAny,)
    #filterset_class = JournalFilter
    #search_fields = ['name']
