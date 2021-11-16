from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from reader.api.serializers.pages import PageRequestSerializer
from journal.models import Issue


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
        return Response({ 
            "has_articles": issue.has_articles, 
            "is_paid": is_paid, 
            "issue_id": request.data["issue_id"],
            "issue_name": issue.name,
            "journal_name": issue.journal.name,
            "name_slug": issue.journal.name_slug,
            "released": issue.release_date.strftime('%d/%m/%Y'),
            "issue_cover": issue.common_cover
            })