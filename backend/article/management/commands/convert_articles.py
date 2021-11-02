from os.path import isdir
from django.core.management.base import BaseCommand
from django.core.files import File
from django.conf import settings
import os
from django.core.exceptions import ObjectDoesNotExist
from article.tasks import convert_atricles_to_ogg


class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Convert article task')
        convert_atricles_to_ogg()
