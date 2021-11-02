from celery.decorators import task 
from django.conf import settings
from .models import Article, ArticleCoverSetting
from django.core.files import File
import random

from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw

@task()
def make_article_cover_task(article_id):
    font = ImageFont.truetype("./init_data/fonts/Raleway-VariableFont_wght.ttf", 82)
    ri = random.randint(1,10)
    path = '%s/init_data/canvas/%s/image.jpg' % (settings.BASE_DIR,ri)
    article = Article.objects.get(pk=article_id)
    journal = article.issue.journal
    opt = ArticleCoverSetting.objects.get(journal=journal)
    img = Image.open(path)
    draw = ImageDraw.Draw(img)
    draw.text((opt.title_x, opt.title_y),article.title,(0,0,0,255),font=font)
    draw.text((opt.title_x, opt.title_y),article.title,(0,0,0,255),font=font)
    draw.text((opt.title_x, opt.title_y),article.title,(0,0,0,255),font=font)
    draw.text((opt.title_x, opt.title_y),article.title,(0,0,0,255),font=font)
    img.save('tmp.jpg')
    with open('tmp.jpg', 'rb') as doc_file:
       article.cover.save(f'cover.jpg', File(doc_file), save=True)
    print('Making cover for %s' % article.title)


from .aconverter import make_audio
from article.models import Article


def convert_atricles_to_ogg():
    print('Converting....')
    for a in Article.objects.filter(audio_converted=False).order_by('-id')[0:10]:
        make_audio(a)
