from django import template
from django.utils.safestring import mark_safe
from django.conf import settings
from bs4 import BeautifulSoup
register = template.Library() 
import os

@register.simple_tag
def react_app():
    path = os.path.join(settings.BASE_DIR, 'static','build','index.html')
    with open(path,'r') as f:
        html = f.read()
    soup = BeautifulSoup(html, 'html.parser')
    out = []
    for js in soup.find_all('script'):
        script_item = []
        script_item.append('src="/static/build/%s"' % js['src'])
        out.append('<script '+' '.join(script_item)+' async></script>')
    return mark_safe(''.join(out))

