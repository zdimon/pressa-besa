from django.core.management.base import BaseCommand
from django.core.files import File
from django.conf import settings
import os
from accounts.models import Customer
from subscribe.models import Abonement, UserAbonement
import datetime

def load_abon():
    #Customer.objects.all().delete()
    abonement = Abonement.objects.get(pk=2)
    user = Customer.objects.get(username='sf')
    ua = UserAbonement()
    ua.user = user
    ua.abonement = abonement
    ua.start_date = datetime.datetime.now()
    ua.stop_date = datetime.datetime.now()
    ua.real_cost = 12
    ua.save()

def load_users():
    Customer.objects.all().delete()
    u = Customer()
    u.username = 'admin'
    u.set_password('admin')
    u.is_superuser = True
    u.is_staff = True
    u.is_active = True
    u.save()

    u = Customer()
    u.username = 'sf'
    u.set_password('sf')
    u.is_superuser = True
    u.is_staff = True
    u.is_active = True
    u.save()

class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Loading users')
        load_users()
        print('Loading abonements')
        load_abon()