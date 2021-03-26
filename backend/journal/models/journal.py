from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from django.utils.timezone import now
from django.utils.safestring import mark_safe
from django.conf import settings
from .mixins.name_slug import NameSlugMixin

class Journal(NameSlugMixin, models.Model):

    name = models.CharField(verbose_name=_('наименование издания'),
                            max_length=250)
    category = models.ManyToManyField('catalog.Category', verbose_name=_('Категории в Pressa.ru'))

    default_cover = models.ImageField(
        verbose_name=_('обложка по умолчанию'),
        upload_to='default_journal_cover/%Y/%m/%d/',
        blank=True, null=True)

    is_new = models.BooleanField(
        verbose_name=_(u'отображать в новом?'), default=False)

    is_popular = models.BooleanField(
        verbose_name=_(u'отображать в популярном?'), default=False)
        
    position_popular = models.IntegerField(
        verbose_name=_(u'позиция в популярном'), default=1)

    cover_size = models.CharField(verbose_name=_(u'Размеры обложки'), default='', max_length=10, blank=True, null=True)

    amount = models.DecimalField(_("цена"), max_digits=10, decimal_places=2, default=0.00)

    def __str__(self):
        return self.name

    @property
    def cover(self):
        return self.default_cover

    @property
    def last_issue(self):
        try:
            return self.issue_set.filter(is_public=True)[0]
        except IndexError:
            return None

    @property
    def common_cover(self):
        return self.last_issue.common_cover
        if self.last_issue:
            return self.last_issue.common_cover
        elif self.default_cover:
            return self.default_cover.url
        else:
            return None

    def image_url(self):
        try:
            return f'{settings.BACKEND_URL}{self.default_cover.url}'
        except:
            return 'noimage.png'

    @property
    def image_tag(self):
        return mark_safe(f'<img src="{self.image_url()}"  />')
