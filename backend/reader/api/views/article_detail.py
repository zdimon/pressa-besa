from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from reader.api.serializers.article import ArticleDetailSerializer, ArticleDetailRequestSerializer
from article.models import Article

class ArticleDetailView(APIView):
    '''

     Get articles detail.

    '''
    permission_classes = (AllowAny,)

    @swagger_auto_schema(
        request_body=ArticleDetailRequestSerializer,
    )
    def post(self, request):
        try:
            article = Article.objects.get(pk=request.data["article_id"])
        except ObjectDoesNotExist:
            return Response({"status": 1, "message": "Article not found"})
        return Response({ "status":0, "payload": ArticleDetailSerializer(article).data })