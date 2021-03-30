from django.core.management.base import BaseCommand
from catalog.models import Category
from journal.models import Issue, Journal, IssuePage
from django.core.files import File
from django.conf import settings
import os

class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Process')
      
        for i in Issue.objects.all():
            i.is_public = True
            i.save()
        #     print(i.id)

        for j in Journal.objects.all():
            j.is_popular = True
            j.is_new = True
            j.save()
