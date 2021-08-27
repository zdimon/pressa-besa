from re import I
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from reader.api.serializers.pages import PageRequestSerializer, PageSerializer
from journal.models import Issue, IssuePage


class PagesView(APIView):
    '''

     Get issue pages.

    '''
    permission_classes = (AllowAny,)

    @swagger_auto_schema(
        request_body=PageRequestSerializer,
    )
    def post(self, request):
        try:
            issue = Issue.objects.get(pk=request.data["issue_id"])
        except ObjectDoesNotExist:
            return Response({"status": 1, "message": "Issue not found"})
        print(request.data["issue_id"])
        out = []
        for i in IssuePage.objects.filter(paper=issue):
            out.append(PageSerializer(i).data)
        return Response({ "status":0, "payload": out })