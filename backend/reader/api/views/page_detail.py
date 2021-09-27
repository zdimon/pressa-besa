from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from reader.api.serializers.pages import PageDetailSerializer, DetailPageRequestSerializer
from journal.models import Issue, IssuePage



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

