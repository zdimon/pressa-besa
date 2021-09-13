from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from bookmarks.serializers.bookmark import RequestBookmarksSerializer, BookmarksSerializer
from bookmarks.models import Bookmarks
from journal.models import Issue
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from article.models import Article

class AddBookmarkView(APIView):
    '''

     Adding bookmark.

    '''
    permission_classes = (IsAuthenticated,)

    @swagger_auto_schema(
        request_body=RequestBookmarksSerializer,
        responses={200: BookmarksSerializer}
    )
    def post(self, request):
        user = request.user
        obj = RequestBookmarksSerializer(data=request.data)
        if obj.is_valid():
            print(obj.data["article_id"])
            try:
                article = Article.objects.get(pk=obj.data["article_id"])
            except ObjectDoesNotExist:
                return Response({"status": 1, "message": _('Статья не найдена.')})
                
            try:
                b = Bookmarks.objects.get(owner=user, article=obj.data["article_id"])
                return Response({"status": 1, "message": _('Закладка уже существует.')})
            except ObjectDoesNotExist:

                b = Bookmarks()
                b.issue = article.issue
                b.owner = user
                b.article = obj.data["article_id"]
                b.page = obj.data["page_id"]
                b.save()
                return Response({"status": 0, "message": _('Закладка добавлена.')})
        else:
            return Response({"status": 1, "message": _('Ошибка данных.')})
