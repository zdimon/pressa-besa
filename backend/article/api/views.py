from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from django.utils.decorators import method_decorator
from rest_framework.response import Response
from .serializers import ArticleInfoRequestSerializer, ArticleSerializer
from article.models import Article
from rest_framework import mixins, generics
from article.serializers.article import ArticleSerializer


class ArticleInfoView(APIView):
    '''

     Get articles info.

    '''
    permission_classes = (AllowAny,)
    @swagger_auto_schema(
        request_body=ArticleInfoRequestSerializer,
    )
    def post(self, request):
        news = Article.objects.get(pk=request.data["id"])
        return Response(ArticleSerializer(news).data)

@method_decorator(name='list', decorator=swagger_auto_schema(
    request_body=ArticleInfoRequestSerializer,
))
class ArticleListView(mixins.ListModelMixin, generics.GenericAPIView,):
    permission_classes = (AllowAny,)
    http_method_names = ['get', 'head']
    #pagination_class = api_settings.DEFAULT_PAGINATION_CLASS
    serializer_class = ArticleSerializer

class CourseListView(generics.ListAPIView):
    permission_classes = [AllowAny, ]
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def list(self, request, format=None):
      queryset = Article.objects.all()
      serializer = ArticleSerializer(queryset, many=True)
      return Response(serializer.data)