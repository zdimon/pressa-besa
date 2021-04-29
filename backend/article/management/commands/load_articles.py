from django.core.management.base import BaseCommand
from catalog.models import Category
from journal.models import Issue, Journal
from article.models import Article, ArticleCoverSetting, ArticleImages
from django.core.files import File
from django.conf import settings
import os
import random


class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Loading articles')
        Article.objects.all().delete()
        ArticleCoverSetting.objects.all().delete()
        titles = ['Как прожить и не работать Как прожить и не работать',
                  'Горе от ума и кошелька. Горе от ума и кошелька.',
                  'Служу советскому союзу. Служу советскому союзу.']

        subtitles = ['В мире животных В мире животных',
                     'Исскуство жить В мире животных',
                     'Как приколоться В мире животных']

        for i in Issue.objects.all():
            cnt = 0
            for title in titles:
                text = ' '.join(['text %s' % i for i in range(1,100)])
                cnt += 1
                a = Article()
                a.title = title
                a.subtitle = subtitles[cnt-1]
                a.issue = i
                a.text = text
                a.author = 'Митрофан'
                a.page = cnt
                a.save()
                ai = ArticleImages()
                ai.article = a
                ai.save()
                img = f'{random.randint(1,6)}.jpeg'
                path = os.path.join(settings.BASE_DIR,'init_data', 'article',img)
                with open(path, 'rb') as doc_file:
                    ai.image.save(img, File(doc_file), save=True)
                print('saving %s --- %s' % (i.name,title))

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
