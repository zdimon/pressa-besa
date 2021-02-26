from django.core.management.base import BaseCommand
from main.models import Category, Journal

class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Loading category')
        Category.objects.all().delete()
        names = ['ЖЕНСКИЕ', 'МУЖСКИЕ', 'ДЕТСКИЕ ДОМ И СЕМЬЯ АВТО СПОРТ', 'РЕЛИГИЯ ОБЩЕСТВО', 'ПОЛИТИКА БИЗНЕС', 'ФИНАНСЫ НАУЧНО-ПОПУЛЯРНЫЕ']
        for name in names:
            c = Category()
            c.name = name
            c.save()
            print('Saving %s' % name)

            journal_list = ['Наука и техника', 'Здоровье']
            for jname in journal_list:
                j = Journal()
                j.name = jname
                j.save()
                j.category.add(c)

        