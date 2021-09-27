from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from reader.api.serializers.issue_request import IssueRequestSerializer
from reader.api.serializers.subscription import SubscriptionSerializer
from journal.models import Issue, Journal
from subscribe.models import Subscription


class SubscriptionDetailView(APIView):
    '''

    Subscription detail.

    '''
    permission_classes = (AllowAny,)

    @swagger_auto_schema(
        request_body=IssueRequestSerializer,
    )
    def post(self, request):
        try:
            journal = Journal.objects.get(pk=request.data["journal_id"])
        except ObjectDoesNotExist:
            return Response({"status": 1, "message": "Journal not found"})

        subs = []
        for j in Subscription.objects.filter(journal=journal).order_by('months'):
            subs.append(SubscriptionSerializer(j).data)
        return Response({"status": 1, "payload": subs })