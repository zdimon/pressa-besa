from django.core.management.base import BaseCommand
from django.core.files import File
from django.conf import settings
import os
from accounts.models import MailTemplate

class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Loading mail templates')
        MailTemplate.objects.all().delete()
        u = MailTemplate()
        u.alias = 'registration'
        u.title_ru = 'Регистрация'
        u.title_en = 'Registration'
        u.content_ru = 'Ваш пароль: {{password}}'
        u.content_en = 'Your password is: {{password}}'
        u.save()