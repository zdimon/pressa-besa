from django.shortcuts import render
from django.http import JsonResponse
from django.utils.translation import ugettext_lazy as _

'''
{
    lng: 'de',
    resources: {
        de: {
            translation: {
                "hello world": "hallo Welt"
            }
        }
    }


'''
def translate(request):
    return render(request, 'translator/index.tpl',content_type="application/json")