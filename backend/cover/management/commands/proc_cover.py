from django.core.management.base import BaseCommand
from catalog.models import Category
from journal.models import Issue, Journal, IssuePage
from django.core.files import File
from django.conf import settings
import os
from cover.tasks import make_covers

class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Process covers')
        make_covers()
