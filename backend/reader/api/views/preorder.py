from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from reader.api.serializers.article import ArticleRequestSerializer
from journal.models import Issue


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