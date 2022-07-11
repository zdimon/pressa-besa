from django.core.management.base import BaseCommand
from catalog.models import Category
from django.conf import settings
import os

class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Updating category')
        for c in Category.objects.all():
            c.show_in_new_catalog = True
            c.save()