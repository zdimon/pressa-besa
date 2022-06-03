from django.core.management.base import BaseCommand
from catalog.models import Category
from journal.models import Issue, Journal, IssuePage, PublishingOffice
import os
from article.models import Article

class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Load translation')
        for j in Journal.objects.all():
            print('Translation %s' % j.name)
            j.name_en = 'Eng %s' % j.name
            j.name_ru = j.name
            j.name_de = 'De %s' % j.name
            j.save()

        for j in Article.objects.all():
            print('Translation %s' % j.title)
            j.title_en = 'Eng %s' % j.title
            j.title_ru = j.title
            j.title_de = 'De %s' % j.title
            j.save()