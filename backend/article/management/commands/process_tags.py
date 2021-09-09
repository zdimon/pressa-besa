from os.path import isdir
from django.core.management.base import BaseCommand
from catalog.models import Category
from journal.models import Issue, Journal
from article.models import Article
from django.core.files import File
from django.conf import settings
import os
from django.core.exceptions import ObjectDoesNotExist

class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Process tags')
        for a in Article.objects.all().order_by('-id'):
            print(f'artocle:{a.pk}')
            issue = a.issue
            journal = issue.journal
            cats = journal.category
            for c in cats.all():
                #print(c.name.lower())
                tag = c.name.lower()
                a.taggit.add(tag)
