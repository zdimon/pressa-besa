from django.core.management.base import BaseCommand
from catalog.models import Category
from journal.models import Issue, Journal, IssuePage
from django.core.files import File
from django.conf import settings
import os

class Command(BaseCommand):

    def handle(self, *args, **options):
        for j in Journal.objects.all():
            issue = Issue.objects.filter(journal=j).order_by('-id').first()
            j.last_issue_id = issue.id
            j.is_new = True
            j.save()
            print(f"Process...{issue.id}")

