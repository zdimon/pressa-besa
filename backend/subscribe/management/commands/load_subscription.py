from django.core.management.base import BaseCommand
from django.core.files import File
from django.conf import settings
import os
from subscribe.models import Subscription
from journal.models import Journal

class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Loading abonement')
        Subscription.objects.all().delete()

        for j in Journal.objects.all():
            for mc in [1,6,12]:
                s = Subscription()
                s.journal = j
                s.count = mc
                s.months = mc
                s.cost = mc
                s.save()
                print('Saving...%s' % j)