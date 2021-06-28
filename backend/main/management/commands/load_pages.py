from django.core.management.base import BaseCommand
from django.conf import settings
from django.contrib.flatpages.models import FlatPage
from django.contrib.sites.models import Site
class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Loading pages')
        site = Site.objects.get(pk=1)
        FlatPage.objects.all().delete()
        f = FlatPage()
        f.url = '/about/'
        f.title = 'About page ru'
        f.content = 'Content'
        f.title_ru = 'About page ru'
        f.content_ru = 'Content'
        f.title_en = 'About page en'
        f.content_en = 'Content en'
        f.title_de = 'About page de'
        f.content_de = 'Content de'
        f.save()
        f.sites.add(site)

        f = FlatPage()
        f.url = '/publisher/'
        f.title = 'publisher page ru'
        f.content = 'publisher publisher'
        f.title_ru = 'publisher page ru'
        f.content_ru = 'Content publisher'
        f.title_en = 'publisher page en'
        f.content_en = 'Content en publisher'
        f.title_de = 'publisher page de'
        f.content_de = 'Content de publisher'
        f.save()
        f.sites.add(site)

        f = FlatPage()
        f.url = '/advertiser/'
        f.title = 'advertiser page ru'
        f.content = 'advertiser advertiser'
        f.title_ru = 'advertiser page ru'
        f.content_ru = 'Content advertiser'
        f.title_en = 'advertiser page en'
        f.content_en = 'Content en advertiser'
        f.title_de = 'advertiser page de'
        f.content_de = 'Content de advertiser'
        f.save()
        f.sites.add(site)

        f = FlatPage()
        f.url = '/help/'
        f.title = 'help page ru'
        f.content = 'help advertiser'
        f.title_ru = 'help page ru'
        f.content_ru = 'Content help'
        f.title_en = 'help page en'
        f.content_en = 'Content en help'
        f.title_de = 'help page de'
        f.content_de = 'Content de help'
        f.save()
        f.sites.add(site)

        f = FlatPage()
        f.url = '/agreement/'
        f.title = 'agreement page ru'
        f.content = 'agreement advertiser'
        f.title_ru = 'agreement page ru'
        f.content_ru = 'Content help'
        f.title_en = 'agreement page en'
        f.content_en = 'Content en help'
        f.title_de = 'agreement page de'
        f.content_de = 'Content de help'
        f.save()
        f.sites.add(site)

        f = FlatPage()
        f.url = '/privacy/'
        f.title = 'privacy page ru'
        f.content = 'privacy advertiser'
        f.title_ru = 'privacy page ru'
        f.content_ru = 'Content help'
        f.title_en = 'privacy page en'
        f.content_en = 'Content en help'
        f.title_de = 'privacy page de'
        f.content_de = 'Content de help'
        f.save()
        f.sites.add(site)