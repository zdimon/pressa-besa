from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils.translation import ugettext as __
from image_cropping import ImageRatioField
from easy_thumbnails.files import get_thumbnailer
from django.utils.html import mark_safe
from main.models.mixins import  SlugTraits
from journal.models.mixins.name_slug import NameSlugMixin
from journal.models.models import Issue
from redactor.fields import RedactorField
from accounts.models import Customer
from ratings.models import Ratings
from taggit.managers import TaggableManager
from django.dispatch import receiver
from django.db.models.signals import post_save
import datetime
from announce.tasks import send_top as st
from django.core.mail import EmailMultiAlternatives

class Announce(models.Model):
    title = models.CharField(verbose_name=_(u'заголовок'), max_length=150)
    text = models.TextField(verbose_name=_(u'текст анонса выпуска'))
    issue = models.ForeignKey('journal.Issue',
                              verbose_name=_(u'выпуск издания'))
    create = models.DateTimeField(verbose_name=u'дата создания')

    class Meta:
        verbose_name = _(u'анонс выпуска')
        verbose_name_plural = _(u'анонсы выпусков')


class Featured(models.Model):
    title = models.CharField(verbose_name=_(u'заголовок'), max_length=150)
    text = models.TextField(verbose_name=_(u'текст анонса'))
    page = models.ForeignKey('journal.IssuePage',
                             verbose_name=_(u'страница печатного издания'))
    cover = models.ImageField(verbose_name=_(u'обложка'),
                              upload_to='featured/cover/%Y/%m/%d/')
    create = models.DateTimeField(verbose_name=u'дата создания')

    class Meta:
        verbose_name = _(u'избранная статья')
        verbose_name_plural = _(u'избранные статьи')


class News(NameSlugMixin,  SEOTagsMixin, models.Model):
    create = models.DateField(verbose_name=u'дата создания')
    name = models.CharField(verbose_name=_(u'заголовок'), max_length=150)
    publication = models.CharField(verbose_name=_(u'Название журнала'), max_length=150, default = False)
    issue = models.ForeignKey(Issue, verbose_name=_(u'печатное издание'), blank = True, default = False, null=True)
    short_text = models.TextField(verbose_name=_(u'короткое описание'), blank = True,  null=True)
    text = RedactorField(verbose_name=_(u'начало статьи'))
    text_continue = RedactorField(verbose_name=_(u'продолжение'), blank = True, null=True)
    image = models.ImageField(verbose_name=_(u'изображение ландшафт'), upload_to='news/cover/%Y/%m/%d/')
    image_portret = models.ImageField(verbose_name=_(u'изображение портрет'), upload_to='news/cover/%Y/%m/%d/')
    url = models.URLField(verbose_name=u'ссылка на ридер')
    cropping = ImageRatioField('image', '480x270')
    cropping_portret = ImageRatioField('image_portret', '205x282')
    cropping_square = ImageRatioField('image_portret', '80x80')
    is_publish = models.BooleanField(verbose_name=_(u'Опубликован?'), default=False)
    author = models.CharField(verbose_name=_(u'Автор'), max_length=250, blank = True, null=True)
    rating = Ratings()
    tags = TaggableManager(blank=True)
    sorting = models.IntegerField(verbose_name=_(u'Сортировка'), default=0)
    @property
    def publication_name(self):
        #return self.issue.journal+' '+_('выпуск')+' '+self.issue
        return self.issue.journal.name_ru+u' № '+self.issue.name
    def get_absolute_url(self):
        return '/top10/detail/%s-%s' % (self.name_slug,self.id)
    def __unicode__(self):
        return self.name

    @property
    def thumbnailsmall_url_square(self):
        try:
            return get_thumbnailer(self.image_portret).get_thumbnail({
                'size': (80, 80),
                'box': self.cropping_square,
                'crop': True,
                'detail': True,
            }).url
        except:
            return ''

    @property
    def thumbnailsmall_url_portrait(self):
        try:
            return get_thumbnailer(self.image_portret).get_thumbnail({
                'size': (205, 282),
                'box': self.cropping_portret,
                'crop': True,
                'detail': True,
            }).url
        except:
            return ''
    @property
    def thumbnailsmall_url(self):
        try:
            return get_thumbnailer(self.image).get_thumbnail({
                'size': (200, 100),
                'box': self.cropping,
                'crop': True,
                'detail': True,
            }).url
        except:
            return ''
    @property
    def thumbnailmiddle_url(self):
        try:
            return get_thumbnailer(self.image).get_thumbnail({
                'size': (480, 270),
                'box': self.cropping,
                'crop': True,
                'detail': True,
            }).url
        except:
            return ''
    def thumbnailsmall(self):
        return mark_safe(u'<img align="left" style="padding-right: 10px" src="%s" title="%s"/>' % (self.thumbnailsmall_url, self.name))

    def thumbnail(self):
        try:
            thumbnail_url = get_thumbnailer(self.image).get_thumbnail({
                'size': (480, 270),
                'box': self.cropping,
                'crop': True,
                'detail': True,
            }).url
            return mark_safe(u'<img src="%s" title="%s"/>' % (thumbnail_url, self.name))
        except:
            return ''
    def thumbnailbig(self):
        try:
            thumbnail_url = get_thumbnailer(self.image).get_thumbnail({
                'size': (480, 270),
                'box': self.cropping,
                'crop': True,
                'detail': True,
            }).url
            return mark_safe(u'<img align="right" style="padding: 0 0 0 15px" src="%s" title="%s"/>' % (thumbnail_url, self.name))
        except:
            return ''
    class Meta:
        verbose_name = _(u'обзор')
        verbose_name_plural = _(u'Обзор прессы')



class Subscribers(models.Model):
    create = models.DateField(verbose_name=u'дата создания')
    email = models.EmailField(verbose_name=_(u'email'))

    def send(self,date):

        it = News.objects.filter(create=date,is_publish=True)
        mes = u'<table>'
        for i in it:
            try:
                thumbnail_url = get_thumbnailer(i.image).get_thumbnail({
                    'size': (480, 270),
                    'box': i.cropping,
                    'crop': True,
                    'detail': True,
                }).url
                im = mark_safe(u'<img src="http://pressa.ru/%s" title="%s"/>' % (thumbnail_url, i.name))
            except:
                im = ''
            n = str(i.name).encode('utf-8')
            mes += u'<tr><td><p></p><p>%s</p><p>%s</p></td></tr>' % ( str(i.name).encode('utf-8'), i.short_text)
            #import pdb; pdb.set_trace()
        mes += u'</table>'
        f = open('/home/zarik/tmp/text.txt', 'w')
        f.write(mes)
        f.close()
        title = _('ТОП 10 популярных статей')
        msg = EmailMultiAlternatives(title, mes, 'inform@pressa.ru', (self.email,))
        msg.content_subtype = "html"
        #msg.send()
    class Meta:
        verbose_name = _(u'подписку')
        verbose_name_plural = _(u'Подписки на рассылку')

class Toplog(models.Model):
    create = models.DateField(verbose_name=u'дата создания')
    count = models.IntegerField(verbose_name=_(u'Кол-во подписчиков'), default=0)
    count_track = models.IntegerField(verbose_name=_(u'Кол-во приходов'), default=0)
    class Meta:
        verbose_name = _(u'лог')
        verbose_name_plural = _(u'История рассылки')

@receiver(post_save, sender=News)
def send_top(sender, instance, **kwargs):
    cnt = News.objects.filter(create=instance.create,is_publish=True).count()
    if cnt==10:
        try:
            cnt_log = Toplog.objects.get(create=instance.create)
        except:
            cnt_sub = Subscribers.objects.all().count()
            subs = Subscribers.objects.all()
            tl = Toplog()
            tl.create = instance.create
            tl.count = cnt_sub
            tl.save()
            st.delay(instance.create,tl.id)
