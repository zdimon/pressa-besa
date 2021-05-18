from django.db import models
from django.utils.translation import ugettext_lazy as _


class SEOTagsMixin(models.Model):
    keywords = models.TextField(verbose_name=_(u'Ключевые слова'),
                                blank=True, null=True)
    description = models.TextField(verbose_name=_(u'Описание'),
                                   blank=True, null=True)

    class Meta:
        abstract = True