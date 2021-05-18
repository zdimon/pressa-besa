from django.db import models
from taggit.managers import TaggableManager
from .mixins.name_slug import NameSlugMixin
from .mixins.address import AddressMixin
from .mixins.create_update import CreateUpdateMixin
from .mixins.seo import SEOTagsMixin
from .mixins.public import PublicMixin
from django.utils.translation import ugettext_lazy as _
import uuid


class PublishingOffice(NameSlugMixin, AddressMixin, SEOTagsMixin,
                       CreateUpdateMixin, models.Model):

    name = models.CharField(verbose_name=_(u'Название издательства'),
                            max_length=100)
    site = models.URLField(verbose_name=_(u'Сайт издательства'),
                           blank=True, null=True)
    phone = models.CharField(verbose_name=_(u'Номер телефона'), max_length=20,
                             blank=True, null=True)
    logo = models.ImageField(verbose_name=_(u'Логотип издательства'),
                             upload_to='publishing_logo/%Y/%m/%d/',
                             blank=True, null=True)

    nds = models.SmallIntegerField(verbose_name=_(u'НДС'),
                                   default=0)

    uuid_key = models.CharField(max_length=64, verbose_name=u"UUID key", default='')

    show_site_link = models.BooleanField(
        verbose_name=_(u'Отображать ссылку на сайт?'), default=False)


    def __str__(self):
        return self.name

    @staticmethod
    def autocomplete_search_fields():
        return ("id__iexact", "name__icontains",)

    tags = TaggableManager(blank=True)

    @property
    def name_clean(self):
        return self.name.replace('"','')

    @property
    def categories(self):
        from catalog.models import Category
        return Category.objects.filter(
            journal__in=self.journal_set.all()).distinct()

    class Meta:
        app_label = 'journal'
        ordering = ('name', )
        verbose_name = _(u'издательство')
        verbose_name_plural = _(u'издательства')

    def save(self, *args, **kwargs):
        if not self.pk:
            self.uuid_key = str(uuid.uuid1())
        super(PublishingOffice, self).save(*args, **kwargs)