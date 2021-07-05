from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from django.utils.timezone import now
from django.utils.safestring import mark_safe
from django.conf import settings
from .mixins.name_slug import NameSlugMixin
from sorl.thumbnail import get_thumbnail
from django.urls import reverse
from catalog.utils import get_journal_type

class Journal(NameSlugMixin, models.Model):

    JOURNAL_TYPE_CHOICES = (
        ('magazine', _(u'Журнал')),
        ('paper', _(u'Газета')),
        ('book', _(u'Книга')),
    )

    publishing_office = models.ForeignKey('journal.PublishingOffice',
                                          verbose_name=_(u'Издательство'),
                                          on_delete=models.SET_NULL,
                                          null=True,
                                          blank=True)

    journal_type = models.CharField(verbose_name=_(u'тип издания (журнал, газета или книга)'),
                                    choices=JOURNAL_TYPE_CHOICES,
                                    db_index = True,
                                    default='magazine',
                                    max_length=10)

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

    show_in_books = models.BooleanField(
        verbose_name=_(u'Показывать в блоке "Книги"'), default=False)

    is_export_to_air = models.BooleanField(
        verbose_name=_(u'выгружать ли в авиатранспорт?'), default=False)

    last_issue_id = models.IntegerField(
        default=0,
        verbose_name=_(u'ID последнего выпуска'))

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
            return self.issue_set.filter(is_public=True).order_by('-id')[0]
        except IndexError:
            return None

    @property
    def common_cover(self):
        if self.last_issue:
            return self.last_issue.common_cover
        elif self.default_cover:
            return self.default_cover.url
        else:
            return None

    @property
    def get_journal_type_url(self):
        if self.journal_type == 'magazine':
            return 'magazines'
        elif self.journal_type == 'paper':
            return 'newspapers'
        elif self.journal_type == 'book':
            return 'books'
        elif self.journal_type == 'abonement':
            return 'abonement'
        else:
            return 'all'

    @property
    def big_cover(self):
        if self.last_issue:
            im = get_thumbnail(self.last_issue.cover, '306x433', crop='top')
            return im.url
        elif self.default_cover:
            return self.default_cover
        else:
            return None

    @property
    def just_cover(self):
        if self.last_issue:
            if (self.last_issue.is_covers_created):
                return self.last_issue.cover_url_mask.replace('{size}','306-433')
            else:
                return reverse('mts_get_cover', args=['journal','306-433',self.pk])
        else:
            return reverse('mts_get_cover', args=['journal','306-433',self.pk])

    def image_url(self):
        try:
            return f'{settings.BACKEND_URL}{self.default_cover.url}'
        except:
            return 'noimage.png'

    @property
    def image_tag(self):
        return mark_safe(f'<img src="{self.image_url()}"  />')

    @property
    def active_issue_set(self):
        issues = self.issue_set.filter(is_public=True)
        return issues