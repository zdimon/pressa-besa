from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.utils.translation import ugettext_lazy as _
from django.core.exceptions import ObjectDoesNotExist
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from reader.api.serializers.buy_subscription import BuySubsctiptionRequestSerializer
from subscribe.models import Subscription, UserSubscrition
from journal.models import PurchasedIssues



class BuySubscriptionView(APIView):
    '''

    Buy subscription for the term.

    '''
    permission_classes = (IsAuthenticated,)

    @swagger_auto_schema(
        request_body=BuySubsctiptionRequestSerializer,
    )
    def post(self, request):
        customer = request.user.customer
        try:
            sub = Subscription.objects.get(pk=request.data["subscription_id"])
        except ObjectDoesNotExist:
            return Response({"status": 1, "message": "Subscription not found"})
        if customer.amount < sub.cost:
            return Response({"status": 2, "message": _('У вас недостаточно средств на счету. Пополните счет.')})

        us = UserSubscrition()
        us.subscription = sub
        us.owner = customer
        us.count = sub.count
        us.save()
        issue = sub.journal.last_issue
        try:
            bi = PurchasedIssues.objects.get(customer=customer,issue=issue)
        except Exception as e:
            bi = PurchasedIssues()
            bi.customer = customer
            bi.purchased_type = 'subscribe'
            bi.issue = issue
            bi.journal = sub.journal
            bi.save()
            us.count = us.count - 1
            us.save()
       
        return Response({"status": 1, "message": _('Вы успешно оплатили подписку.') })