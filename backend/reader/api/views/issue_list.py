from posixpath import join
from re import I
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from reader.api.serializers.article import ArticleRequestSerializer
from reader.api.serializers.issue import IssueSerializer
from journal.models import Issue
from reader.utils import is_cached


class IssueListView(APIView):
    '''

     Get articles of the tag key.

    '''
    permission_classes = (AllowAny,)

    @swagger_auto_schema(
        request_body=ArticleRequestSerializer,
    )
    def post(self, request):
        try:
            issue = Issue.objects.get(pk=request.data["issue_id"])
        except ObjectDoesNotExist:
            return Response({"status": 1, "message": "Issue not found"})        
        out = []
        for i in Issue.objects.filter(journal=issue.journal).exclude(pk=issue.pk).order_by('-id')[0:30]:
            out.append(IssueSerializer(i).data)
        return Response({"status":0, "payload": out})

