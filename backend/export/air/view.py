from django.shortcuts import render
from journal.models import Journal, Issue
import datetime

DOMAIN = 'http://newpressa.pressa.ru'

def export_journals(request):
    now = '%s-%s-%s' % (str(datetime.date.today().year),str(datetime.date.today().month),str(datetime.date.today().day))

    journals = Journal.objects.filter(is_export_to_air=True)
    return render(request,'air_journals.tpl',{'journals': journals, 'DOMAIN': DOMAIN, 'now': now}, content_type='text/xml')


def export_articles(request,id):
    issue = Issue.objects.get(pk=id)
    
    return render(request,'air_articles.tpl',{'DOMAIN': DOMAIN, 'issue': issue}, content_type='text/xml')