from celery.decorators import task
from journal.models import Issue


@task()
def make_covers():
    #for i in Issue.objects.filter(is_covers_created=False).order_by('-id'):
    for i in Issue.objects.all().order_by('-id'):
        print('Process %s' % i.id)
        i.make_covers()
