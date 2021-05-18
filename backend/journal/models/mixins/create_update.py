from django.db import models
from django.utils.translation import ugettext_lazy as _


class CreateUpdateMixin(models.Model):
    create = models.DateTimeField(auto_now_add=True,
                                  verbose_name=u'Дата создания')
    update = models.DateTimeField(auto_now=True,
                                  verbose_name=u'Дата изменения')

    class Meta:
        abstract = True
