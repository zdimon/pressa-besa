from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from .serializers import AnnounceInfoRequestSerializer, NewsSerializer, AnnounceSubscribeRequestSerializer
from announce.models import News, Subscribers
from django.utils.translation import ugettext_lazy as _
from datetime import datetime


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


class AnnounceSubscribeView(APIView):
    '''

     Subscribe to announce.

    '''
    permission_classes = (AllowAny,)
    @swagger_auto_schema(
        request_body=AnnounceSubscribeRequestSerializer,
    )
    def post(self, request):
        try:
            sub = Subscribers.objects.get(email=request.data["email"])
            return Response({"status":1, "message": _("You are allready subscribed")})
        except:
            if request.data["email"].find('@') == -1:
                return Response({"status":1, "message": _("wrong email")})
            s = Subscribers.objects.create(email=request.data["email"], create = datetime.now())
            return Response({"status":0, "message": _("You have been subscribed")})