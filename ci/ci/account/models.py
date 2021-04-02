from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _


class Customer(User):
    name = models.CharField(verbose_name=_(u'ФИО'),
                            max_length=50, blank=True, null=True)
    amount = models.DecimalField(
        verbose_name=_(u'счёт пользователя',),
        default=0,
        max_digits=12,
        decimal_places=2
    )
    photo = models.ImageField(verbose_name=_(u'фотография пользователя'),
                              upload_to='user_photo/%Y/%m/%d/',
                              blank=True, null=True)

    phone_number = models.CharField(blank=True, null=True, max_length=25)
    telegram = models.CharField(verbose_name=_(
        u'логин в телеграм'), blank=True, null=True, max_length=25)
    card = models.CharField(verbose_name=_(
        u'номер карты для приема платежей'), blank=True, null=True, max_length=35)
    desc = models.TextField(verbose_name=_(
        u'Стек технологий которыми владеете'), blank=True, null=True, max_length=25)
