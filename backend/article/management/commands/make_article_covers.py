from django.core.management.base import BaseCommand
from article.models import Article
from article.tasks import make_article_cover_task

class Command(BaseCommand):

    def handle(self, *args, **options):
        print('Making article covers')
        for i in Article.objects.all().order_by('id'):
            make_article_cover_task(i.id)
            # return
