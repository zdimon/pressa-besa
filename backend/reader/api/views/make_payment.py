from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from reader.api.serializers.article import ArticleRequestSerializer
from journal.models import Issue
from billing.utils import buy_issue_transaction, buy_issue_purchase
from journal.models import PurchasedIssues


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

        if issue.journal.amount > user.amount:
            return Response({"status": 2, "message": _('У вас недостаточно средств на счету. Пополните счет.')})

        try:
            purchase = PurchasedIssues.objects.get(customer=user, issue=issue)
            return Response({"status": 1, "message": _("Вы уже оплатили этот выпуск.")})
        except ObjectDoesNotExist:
            buy_issue_transaction(user, issue)
            buy_issue_purchase(user, issue)
            user.amount = user.amount - issue.journal.amount
            user.save()
            return Response({"status": 0, "message": "Вы оплатили издание"})

