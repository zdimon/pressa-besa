from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from .serializers import AnnounceInfoRequestSerializer, NewsSerializer
from announce.models import News


class AnnounceInfoView(APIView):
    '''

     Get articles info.

    '''
    permission_classes = (AllowAny,)
    @swagger_auto_schema(
        request_body=AnnounceInfoRequestSerializer,
    )
    def post(self, request):
        news = News.objects.get(pk=request.data["id"])
        return Response(NewsSerializer(news).data)