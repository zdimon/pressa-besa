from django.core.management.base import BaseCommand
from catalog.models import Category
from journal.models import Issue, Journal, IssuePage, PublishingOffice
import os

class Command(BaseCommand):

    def handle(self, *args, **options):
        PublishingOffice.objects.all().delete()
        for j in Journal.objects.all():
            print('Office for %s' % j.name)
            o = PublishingOffice()
            o.name = f'Издательство {j.name}'
            o.save()
            j.publishing_office = o
            j.save()