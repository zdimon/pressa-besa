from django.core.management.base import BaseCommand
from journal.models import  Journal
from article.models import  ArticleCoverSetting
from django.conf import settings
import os

class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Loading article settings')
        ArticleCoverSetting.objects.all().delete()
        for j in Journal.objects.all():
            s = ArticleCoverSetting()
            s.journal = j
            s.title_x = 10
            s.title_y = 100
            s.number_x = 50
            s.number_y = 70
            s.category_x = 140
            s.category_y = 80
            s.save()
            print('saving settings %s' % s.journal)
