from os.path import isdir
from django.core.management.base import BaseCommand
from catalog.models import Category
from journal.models import Issue, Journal
from article.models import ArticleFontSetting
from django.core.files import File
from django.conf import settings
import os
from django.core.exceptions import ObjectDoesNotExist

class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Loading fonts')
        ArticleFontSetting.objects.all().delete()
        path = os.path.join(settings.BASE_DIR,'init_data','canvas')
        
        dirs = [f for f in os.listdir(path) if os.path.isdir(os.path.join(path, f))]
        for d in dirs:
            fontdir = os.path.join(path, d, 'Fonts')
            fonts = [f for f in os.listdir(fontdir) if os.path.isfile(os.path.join(fontdir, f))]
            for f in fonts:
                print(f)
                fpath = os.path.join(fontdir, f)
                try:
                    nf = ArticleFontSetting.objects.get(name=f)
                except ObjectDoesNotExist:
                    print(f'Creating...{f}')
                    nf = ArticleFontSetting()
                    nf.name = f 
                    nf.save()
                    with open(fpath, 'rb') as doc_file:
                        nf.file.save(f, File(doc_file), save=True)
       