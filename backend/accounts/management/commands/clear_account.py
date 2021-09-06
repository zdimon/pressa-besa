from django.core.management.base import BaseCommand
from django.core.files import File
from django.conf import settings
import os
from billing.models import Transaction
from journal.models import PurchasedIssues
from subscribe.models import Subscription, UserAbonement

class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Clear payments')
        Transaction.objects.all().delete()
        PurchasedIssues.objects.all().delete()
        Subscription.objects.all().delete()
        UserAbonement.objects.all().delete()

