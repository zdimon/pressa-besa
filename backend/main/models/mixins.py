# -*- coding: utf-8 -*-

import pytils

from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.utils.translation import ugettext_lazy as _



class ActiveManager(models.Manager):
    def get_queryset(self):
        return super(ActiveManager, self).get_queryset()\
                                         .filter(is_active='True')


class ActiveMixin(models.Model):
    is_active = models.BooleanField(verbose_name=_(u'Активно'), default=False)
    objects = ActiveManager()

    class Meta:
        abstract = True


class CreateUpdateMixin(models.Model):
    create = models.DateTimeField(auto_now_add=True,
                                  verbose_name=u'Дата создания')
    update = models.DateTimeField(auto_now=True,
                                  verbose_name=u'Дата изменения')

    class Meta:
        abstract = True


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


class SEOTagsMixin(models.Model):
    keywords = models.TextField(verbose_name=_(u'Ключевые слова'),
                                blank=True, null=True)
    description = models.TextField(verbose_name=_(u'Описание'),
                                   blank=True, null=True)

    class Meta:
        abstract = True


class GenericRelationMixin(models.Model):
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')

    class Meta:
        abstract = True
