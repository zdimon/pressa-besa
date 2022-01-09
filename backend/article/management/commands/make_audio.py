from django.core.management.base import BaseCommand
from catalog.models import Category
from journal.models import Issue, Journal
from article.models import Article, ArticleCoverSetting, ArticleImages
from django.core.files import File
from django.conf import settings
import os
import random
import shutil

class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Making audios')
        originp = f'{settings.AUDIO_PATH}/123.ogg'
        for a in Article.objects.all():
            print(a.pk)
            path = f'{settings.AUDIO_PATH}/article-{a.pk}.ogg'
            print(path)
            shutil.copyfile(originp, path)
            a.audio_converted = True
            a.save()