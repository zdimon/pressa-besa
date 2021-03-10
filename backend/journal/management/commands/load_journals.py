from django.core.management.base import BaseCommand
from catalog.models import Category
from journal.models import Issue, Journal, IssuePage
from django.core.files import File
from django.conf import settings
import os

class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Loading category')
        Category.objects.all().delete()
        Journal.objects.all().delete()

        names = ['ЖЕНСКИЕ', 'МУЖСКИЕ', 'ДЕТСКИЕ', 'ДОМ И СЕМЬЯ', 'АВТО', 'СПОРТ', 'РЕЛИГИЯ', 'ОБЩЕСТВО', 'ПОЛИТИКА', 'БИЗНЕС', 'ФИНАНСЫ', 'НАУЧНО-ПОПУЛЯРНЫЕ']
        for name in names:
            c = Category()
            c.name = name
            c.save()
            print('Saving %s' % name)

            journal_list = ['Наука и техника', 'Здоровье', 'Моделист-конструктор', 'Лиза', 'Прибой', 'Забой', 'Внуки и правнуки', 'В мире муравья', 'Крышка стола', 'Восемь']
            cnt = 0
            for jname in journal_list:
                cnt += 1
                j = Journal()
                j.name = jname
                j.save()
                j.category.add(c)
                path = os.path.join(settings.BASE_DIR,'init_data','journal',f'{cnt}.jpg')
                with open(path, 'rb') as doc_file:
                    j.default_cover.save(f'{cnt}.jpeg', File(doc_file), save=True)

                for ni in range(1,20):
                    name = f'выпуск {ni}'
                    i = Issue()
                    i.name = name
                    i.journal = j
                    i.save()

                    for pi in range(1,10):
                        p = IssuePage()
                        p.paper = i
                        p.page = pi
                        p.save()
                        path = os.path.join(settings.BASE_DIR,'init_data','journal',f'{pi}.jpg')
                        with open(path, 'rb') as doc_file:
                            p.file_low.save(f'{pi}.jpeg', File(doc_file), save=True)
                            p.file_middle.save(f'{pi}.jpeg', File(doc_file), save=True)
                            p.file_high.save(f'{pi}.jpeg', File(doc_file), save=True)
        