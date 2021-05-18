
from django.db import models
from django.utils.translation import ugettext_lazy as _


class AddressMixin(models.Model):

    street = models.CharField(verbose_name=_(u'Улица'),
                              blank=True, null=True,
                              max_length=255)
    house = models.CharField(verbose_name=_(u'Номер дома'),
                             blank=True, null=True,
                             max_length=100)
    room = models.CharField(verbose_name=_(u'Номер,квартиры'),
                            blank=True, null=True,
                            max_length=100)
    address_comment = models.CharField(verbose_name=_(u'Комментарий по адресу'),
                                       blank=True, null=True,
                                       max_length=255)

    class Meta:
        abstract = True