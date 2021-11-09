from celery import Celery
from django.conf import settings
import os
from celery.schedules import crontab


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')


app = Celery()
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)

app.conf.beat_schedule = {
    # Executes every Monday morning at 7:30 a.m.
    'convert-articles-audio': {
        'task': 'article.tasks.convert_atricles_to_ogg',
        'schedule': crontab(minute='*/15')
    },
}


