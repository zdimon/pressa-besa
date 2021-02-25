from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from django.utils.timezone import now

class Category(models.Model):
    JOURNAL_TYPE_CHOICES = (
        ('magazine', _('Журнал')),
        ('paper', _('Газета')),
        ('book', _('Книга')),
        ('abonement', u'Абонемент'),
    )
    name = models.CharField(verbose_name=_('наименование категории каталога'), max_length=255)
    category_type = models.CharField(verbose_name=_('тип издания'),
                                     choices=JOURNAL_TYPE_CHOICES,
                                     default='magazine',
                                     max_length=10)
    sorting = models.SmallIntegerField(verbose_name=_('Сортировка'),
                                   default=0)


class Journal(models.Model):

    name = models.CharField(verbose_name=_('наименование издания'),
                            max_length=250)
    category = models.ManyToManyField(Category, verbose_name=_('Категории в Pressa.ru'))

    default_cover = models.ImageField(
        verbose_name=_('обложка по умолчанию'),
        upload_to='default_journal_cover/%Y/%m/%d/',
        blank=True, null=True)

    @property
    def cover(self):
        return self.default_cover


class Issue(models.Model):
    name = models.CharField(verbose_name=_(u'номер выпуска'),
                            max_length=100)

    journal = models.ForeignKey(Journal,
                                verbose_name=_(u'издание'),
                                on_delete=models.CASCADE)

    release_date = models.DateField(verbose_name=_(u'дата выхода выпуска'),
                                    default=now, db_index=True)


class IssuePage(models.Model):
    page = models.PositiveIntegerField(verbose_name=_('номер страницы'))
    paper = models.ForeignKey(Issue,
                                verbose_name=_('печатное издание'),
                                related_name='page_set',
                                on_delete=models.CASCADE)
    file_low = models.ImageField(
        verbose_name=_('файл изображения предпросмотра'),
        upload_to='low',
        blank=True, null=True)
    file_middle = models.ImageField(
        verbose_name=_('файл страницы'),
        upload_to='medium')
    file_high = models.ImageField(
        verbose_name=_('файл страницы увеличенный'),
        upload_to='high',
        blank=True, null=True)
