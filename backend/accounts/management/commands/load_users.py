from django.core.management.base import BaseCommand
from django.core.files import File
from django.conf import settings
import os
from accounts.models import Customer

class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Loading users')
        Customer.objects.all().delete()
        u = Customer()
        u.username = 'admin'
        u.set_password('admin')
        u.is_superuser = True
        u.is_staff = True
        u.is_active = True
        u.save()