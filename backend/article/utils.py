from django.core.files import File
from django.conf import settings
from PIL import Image
from PIL import ImageFont
from PIL import ImageDraw
import os


def get_color(color):
    if color == 'black':
        return (0, 0, 0)
    if color == 'white':
        return (255, 255, 255)


def get_multilines(text):
    if len(text) > 25:
        words = text.split(' ')
        half = int(len(words)/2)
        print(half)
        out = [
            ' '.join(words[0:half]),
            ' '.join(words[half: len(words)])
        ]
        return out
    else:
        return [text]


def make_cover(article, opt, file_name):
    
    img = Image.open(opt.cover.path)
    draw = ImageDraw.Draw(img)
    issue = article.issue

    font = ImageFont.truetype(opt.font.file.path, opt.title_size)
    y_pos = opt.title_y
    for text in get_multilines(article.title):
        for i in range(0, 3):
            draw.text((opt.title_x, y_pos), text, get_color(opt.title_color), font=font)
        y_pos = y_pos + opt.title_size


    font = ImageFont.truetype(opt.font.file.path, opt.number_size)
    for i in range(0, 3):
        draw.text((opt.number_x, opt.number_y), issue.name, get_color(opt.number_color), font=font)
    

    font = ImageFont.truetype(opt.font.file.path, opt.category_size)
    for i in range(0, 3):
        draw.text((opt.category_x, opt.category_y), issue.name, get_color(opt.category_color), font=font)
    


    tmppath = os.path.join(settings.MEDIA_ROOT, file_name)
    img.save(tmppath)
    print('Making cover for %s' % article.title)
