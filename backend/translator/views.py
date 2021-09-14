from django.shortcuts import render
from django.http import JsonResponse
from django.utils.translation import ugettext_lazy as _


def translate(request):
    data = {
        'm_text_riader': _('Текстовая версия'),
        'm_pdf_riader': _('PDF версия'),
        't_payment': _('Оплата выпуска'),
        'm_cost': _('Стоимость покупки'),
        'm_on_account': _('У вас на счету'),
    }
    return JsonResponse(data)