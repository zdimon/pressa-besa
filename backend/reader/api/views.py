from posixpath import join
from re import I
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from reader.api.serializers.pages import PageRequestSerializer, PageSerializer, PageDetailSerializer, DetailPageRequestSerializer
from reader.api.serializers.article import ArticleShortSerializer, ArticleRequestSerializer, ArticleDetailSerializer, ArticleDetailRequestSerializer
from reader.api.serializers.issue import IssueSerializer
from journal.models import Issue, IssuePage
from article.models import Article
from PIL import Image
from app.settings import BACKEND_URL
from journal.models import PurchasedIssues

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
        cnt = 1
        for i in IssuePage.objects.filter(paper=issue).order_by('page'):

            im = Image.open(i.file_low.path)
            if im.size[0] < im.size[1]:
                file_low = f'{BACKEND_URL}/get/page/{i.pk}/low/1'
                file_middle = f'{BACKEND_URL}/get/page/{i.pk}/middle/1'
                file_hight = f'{BACKEND_URL}/get/page/{i.pk}/hight/1'
                out.append({ "page": cnt, "file_low": file_low, "file_middle": file_middle, "file_hight": file_hight })
            else:
                file_low = f'{BACKEND_URL}/get/page/{i.pk}/low/1'
                file_middle = f'{BACKEND_URL}/get/page/{i.pk}/middle/1'
                file_hight = f'{BACKEND_URL}/get/page/{i.pk}/hight/1'
                out.append({ "page": cnt, "file_low": file_low, "file_middle": file_middle, "file_hight": file_hight  })
                file_low = f'{BACKEND_URL}/get/page/{i.pk}/low/2'
                file_middle = f'{BACKEND_URL}/get/page/{i.pk}/middle/2'
                file_hight = f'{BACKEND_URL}/get/page/{i.pk}/hight/2'
                out.append({ "page": cnt+1, "file_low": file_low, "file_middle": file_middle, "file_hight": file_hight  })
                cnt += 1
            #out.append({ "size": str(im.size) })
            cnt += 1
            #out.append(PageSerializer(i).data)
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


class ArticlesFilterView(APIView):
    '''

     Get articles of the tag key.

    '''
    permission_classes = (AllowAny,)

    @swagger_auto_schema(
        request_body=ArticleRequestSerializer,
    )
    def post(self, request):
        
        out = []
        for i in Article.objects.filter(taggit__name__in=[request.data["key"]]).order_by('-id')[0:30]:
            out.append(ArticleShortSerializer(i).data)
        return Response({"status":0, "payload": out})


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
        if request.user.is_authenticated:
            is_paid = issue.is_paid(request.user.customer)
        else:
            is_paid = False
        return Response({ "has_articles": issue.has_articles, "is_paid": is_paid, "issue_id": request.data["issue_id"]})


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


class PreorderView(APIView):
    '''

     Preorder, get info of userr account and cost.

    '''
    permission_classes = (IsAuthenticated,)

    @swagger_auto_schema(
        request_body=ArticleRequestSerializer,
    )
    def post(self, request):
        try:
            issue = Issue.objects.get(pk=request.data["issue_id"])
        except ObjectDoesNotExist:
            return Response({"status": 1, "message": "Issue not found"})

        customer = request.user.customer
        return Response({"account": customer.amount, "cost": issue.journal.amount})


from billing.utils import buy_issue_transaction, buy_issue_purchase

class MakePaymentView(APIView):
    '''

     Pay for issue.

    '''
    permission_classes = (IsAuthenticated,)

    @swagger_auto_schema(
        request_body=ArticleRequestSerializer,
    )
    def post(self, request):
        user = request.user.customer
        try:
            issue = Issue.objects.get(pk=request.data["issue_id"])
        except ObjectDoesNotExist:
            return Response({"status": 1, "message": "Issue not found"})

        try:
            purchase = PurchasedIssues.objects.get(customer=user, issue=issue)
            return Response({"status": 1, "message": _("Вы уже оплатили этот выпуск.")})
        except ObjectDoesNotExist:
            buy_issue_transaction(user, issue)
            buy_issue_purchase(user, issue)
            user.amount = user.amount - issue.journal.amount
            user.save()
            return Response({"status": 0, "message": "Вы оплатили издание"})