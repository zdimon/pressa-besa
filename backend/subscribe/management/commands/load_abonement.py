from django.core.management.base import BaseCommand
from django.core.files import File
from django.conf import settings
import os
from subscribe.models import Abonement
from journal.models import Journal

class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Loading abonement')
        Abonement.objects.all().delete()
        a = Abonement()
        a.title = 'abonement'
        a.cost = 20
        a.save()
        for j in Journal.objects.all():
            a.journals.add(j)