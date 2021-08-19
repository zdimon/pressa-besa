from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _


class Customer(User):
    SEX_CHOICES = ((0, _(u'Женский')), (1, _(u'Мужской')), )
    middle_name = models.CharField(verbose_name=_(u'отчество'),
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
    sex = models.PositiveSmallIntegerField(verbose_name=_(u'пол'),
                                           choices=SEX_CHOICES,
                                           blank=True, null=True)
    phone_number = models.CharField(blank=True, null=True, max_length=15)

    @property
    def my_journals(self):
        return self.purchasedissues_set.order_by(
            'journal').distinct(
            'journal').select_related('journal')


class MailTemplate(models.Model):
    title = models.CharField(blank=True, null=True, max_length=250)
    content = models.TextField(blank=True, null=True)
    alias = models.CharField(blank=True, null=True, max_length=50)