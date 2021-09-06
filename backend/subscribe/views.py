from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from rest_framework.views import APIView
from .serializers.subscribe import RequestAddSubscribeSerializer
from subscribe.models import UserAbonement, Abonement
from subscribe.utils import add_abonement
from django.utils.translation import ugettext_lazy as _
from django.utils import translation

class AddAbonementView(APIView):
    '''

     Add Abonement.

    '''
    permission_classes = (IsAuthenticated,)

    @swagger_auto_schema(
        request_body=RequestAddSubscribeSerializer,
    )
    def post(self, request):
        payload = request.data
        user = request.user
        abon = Abonement.objects.get(pk=1)
        if user.customer.amount < payload["days"]*8:
            message = _('У вас недостаточно средств на счету!')
            return Response({"status": 1, "message": message})
        add_abonement(abon, user, payload["days"])
        message = translation.ugettext('Абонемент на %s дней активирован.' % payload["days"])
        return Response({"status":0, "message": message})