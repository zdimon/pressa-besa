from django.core.management.base import BaseCommand
from django.core.files import File
from django.conf import settings
import os
from announce.models import News
from journal.models import Issue


class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Loading News')
        News.objects.all().delete()
        for i in range(1,4):
            issue = Issue.objects.all().order_by('?')[0]
            n = News()
            n.name = f'Новость {i}'
            txt = ''
            for num in range(1,200):
                txt = txt +' текст новости %s ' % num
            n.text = txt
            n.issue = issue
            n.save()
            path = os.path.join(settings.BASE_DIR,'init_data','news',f'{i}.jpg')
            with open(path, 'rb') as doc_file:
                n.image.save(f'{i}.jpeg', File(doc_file), save=True)