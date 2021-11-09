from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from .serializers import ArticleInfoRequestSerializer, ArticleSerializer
from article.models import Article


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