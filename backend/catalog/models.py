from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from django.utils.timezone import now
from django.utils.safestring import mark_safe

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


class Tag(models.Model):
    name = models.CharField(verbose_name=(u'Наименование тега'), max_length=255)
    show_in_mobile_api = models.BooleanField(verbose_name=(u'Показывать ли в API для мобильных устройств?'), default=False)
    sorting = models.SmallIntegerField(verbose_name=(u'Сортировка'),default=0)
    category = models.ForeignKey('catalog.Category',blank=True, null=True,verbose_name=(u'Категория'),related_name='etags', on_delete=models.CASCADE)
    image = models.ImageField(verbose_name=(u'Изображение'),upload_to='tags',blank=True, null=True)

    def __unicode__(self):
        return self.name
