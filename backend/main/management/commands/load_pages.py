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
        content = '''
        <h3>КАК ЭТО РАБОТАЕТ?</h3>
        <div class="step"><span class="number">1</span>&nbsp;
        <div class="step_descr"><span>ВЫБЕРИТЕ КАТЕГОРИЮ</span>Журналы, газеты или книги - всё представлено на нашем сайте!<span><br /></span></div>
        </div>
        <div class="step"><span class="number">2</span>&nbsp;
        <div class="step_descr"><span>ВЫБЕРИТЕ ИЗДАНИЕ</span><span>Выберите из каталога издание, который вы хотели бы читать<br />- или воспользуйтесь строкой поиска в заголовке сайта.<br /></span></div>
        </div>
        <div class="step"><span class="number">3</span>&nbsp;
        <div class="step_descr"><span>НАЖМИТЕ "ЧИТАТЬ"</span><span>...и вы получите возможность пролистать издание, и для большинства изданий - начать чтение бесплатно! (Увы, для некоторых изданий предварительный просмотр недоступен, в этом случае вместо кнопки "Читать" будет кнопка "Купить".)<br /></span></div>
        </div>
        <div class="step"><span class="number">4</span>&nbsp;
        <div class="step_descr"><span>ОПЛАТА</span>После того, как вы прочитаете бесплатные страницы выпуска издания, вам будет предложено купить право на чтение остального (у нас на сайте принимаются все основные системы оплаты).<span>Перед покупкой, вам потребуется зарегистрироваться на сайте с использованием своего email, либо вы можете авторизоваться с помощью вашей любимой социальной сети.<br /></span></div>
        </div>
        <div class="step"><span class="number">5</span>&nbsp;
        <div class="step_descr"><span>ДОСТУП К ПОКУПКАМ</span>&nbsp;После оплаты выпуски издания будут храниться в вашей коллекции в личном кабинете. Для чтения оплаченных выпусков необходимо авторизоваться на сайте под своим логином. На электронную почту файлы не рассылаются&nbsp;</div>
        </div>
        '''
        f.title_ru = 'help page ru'
        f.content_ru = content
        f.content = content
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