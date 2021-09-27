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
from journal.models import Issue, IssuePage
from PIL import Image
from app.settings import BACKEND_URL
from reader.utils import is_cached
from reader.api.serializers.pages import PageRequestSerializer

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
                if not is_cached(i):
                    file_low = f'{BACKEND_URL}/get/page/{i.pk}/low/1'
                else:
                    file_low = f'{BACKEND_URL}/media/cached_images/{i.paper.pk}/1/low/{i.pk}.jpg'

                file_middle = f'{BACKEND_URL}/get/page/{i.pk}/middle/1'
                file_hight = f'{BACKEND_URL}/get/page/{i.pk}/hight/1'
                out.append({ "page": cnt, "file_low": file_low, "file_middle": file_middle, "file_hight": file_hight })
            else:
                if not is_cached(i):
                    file_low = f'{BACKEND_URL}/get/page/{i.pk}/low/1'
                    file_middle = f'{BACKEND_URL}/get/page/{i.pk}/middle/1'
                else:
                    file_low = f'{BACKEND_URL}/media/cached_images/{i.paper.pk}/1/low/{i.pk}.jpg' 
                    file_middle = f'{BACKEND_URL}/media/cached_images/{i.paper.pk}/1/middle/{i.pk}.jpg'                  
                
                file_hight = f'{BACKEND_URL}/get/page/{i.pk}/hight/1'
                out.append({ "page": cnt, "file_low": file_low, "file_middle": file_middle, "file_hight": file_hight  })

                if not is_cached(i):
                    file_low = f'{BACKEND_URL}/get/page/{i.pk}/low/2'
                    file_middle = f'{BACKEND_URL}/get/page/{i.pk}/middle/2'
                else:
                    file_low = f'{BACKEND_URL}/media/cached_images/{i.paper.pk}/2/low/{i.pk}.jpg' 
                    file_middle = f'{BACKEND_URL}/media/cached_images/{i.paper.pk}/2/middle/{i.pk}.jpg'                    
                file_hight = f'{BACKEND_URL}/get/page/{i.pk}/hight/2'
                out.append({ "page": cnt+1, "file_low": file_low, "file_middle": file_middle, "file_hight": file_hight  })
                cnt += 1
            cnt += 1
        return Response({ "status":0, "payload": out })