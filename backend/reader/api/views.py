from re import I
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from reader.api.serializers.pages import PageRequestSerializer, PageSerializer, PageDetailSerializer, DetailPageRequestSerializer
from reader.api.serializers.article import ArticleShortSerializer, ArticleRequestSerializer, ArticleDetailSerializer, ArticleDetailRequestSerializer
from journal.models import Issue, IssuePage
from article.models import Article


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
        out = []
        for i in IssuePage.objects.filter(paper=issue).order_by('page'):
            out.append(PageSerializer(i).data)
        return Response({ "status":0, "payload": out })

class ArticlesView(APIView):
    '''

     Get articles of the issue.

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
        for i in Article.objects.filter(issue=issue).order_by('page'):
            out.append(ArticleShortSerializer(i).data)
        return Response({ "status":0, "payload": out })


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


class SettingsView(APIView):
    '''

     Get reader settings.

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

        return Response({ "has_articles": issue.has_articles, "is_paid": issue.is_paid(request.user.customer)})


class PageDetailView(APIView):
    '''

     Detail page info.

    '''
    permission_classes = (AllowAny,)

    @swagger_auto_schema(
        request_body=DetailPageRequestSerializer,
    )
    def post(self, request):
        try:
            issue = Issue.objects.get(pk=request.data["issue_id"])
        except ObjectDoesNotExist:
            return Response({"status": 1, "message": "Issue not found"})
        if issue.is_paid(request.user.customer):
            is_paid = True
        else:
            is_paid = False

        try:
            page = IssuePage.objects.get(pk=request.data["page_id"])
        except ObjectDoesNotExist:
            return Response({"status": 1, "message": "Page not found"})

        return Response({ "is_paid": is_paid, "payload": PageDetailSerializer(page).data})