from django.db import models
from main.models.fields import AmountField
from main.models.fields import TruncatingCharField
from main.models.mixins import CreateUpdateMixin
import datetime
from accounts.models import Customer
from django.utils.translation import ugettext_lazy as _


class Payment(models.Model):
    # statuses
    STATUS_CREATED = 0
    STATUS_PAYED = 1
    STATUS_ERROR = 2
    STATUS_CHOICES = (
        (STATUS_CREATED, _(u'Создан')),
        (STATUS_PAYED, _(u'Успешно оплачен')),
        (STATUS_ERROR, _(u'Ошибка оплаты')),
    )

    # Параметры, заполняемые изначально
    owner = models.ForeignKey(Customer,
                              verbose_name=_(u'пользователь'),
                              related_name='payonline_payment_owner',
                              on_delete=models.CASCADE)
    payment_num = models.BigIntegerField(
        verbose_name=u'идентификатор заказа',  # номер транзакции
        default=0,
    )
    operation_amount = AmountField(
        verbose_name=_(u'сумма операции'),
    )
    description = TruncatingCharField(
        verbose_name=_(u'описание товара'),
        max_length=100,
        blank=True, null=True
    )
    operation_status = models.IntegerField(
        verbose_name=_(u'статус операции'),
        default=STATUS_CREATED,
        choices=STATUS_CHOICES
    )

    # Параметры, присылаемые позже
    datetime = models.DateTimeField(
        verbose_name=u'дата операции',
        auto_now_add=True,
    )
    datetime_last_update = models.DateTimeField(
        verbose_name=u'дата последнего обновления',
        auto_now=True,
    )
    transaction_id = models.BigIntegerField(
        verbose_name=u'ID транзакции платежной системы',
        blank=True, null=True
    )
    provider = TruncatingCharField(
        verbose_name=u'платежный инструмент',
        max_length=20,
        blank=True, null=True
    )
    card_holder = TruncatingCharField(
        verbose_name=u'имя держателя карты',
        max_length=100,
        blank=True, null=True
    )
    card_number = TruncatingCharField(
        verbose_name=u'маскированный номер карты',
        max_length=20,
        blank=True, null=True
    )
    country = TruncatingCharField(
        verbose_name=u'код страны',
        max_length=2,
        blank=True, null=True
    )
    city = TruncatingCharField(
        verbose_name=u'город',
        max_length=100,
        blank=True, null=True
    )
    address = TruncatingCharField(
        verbose_name=u'адрес',
        max_length=100,
        blank=True, null=True
    )
    ip_address = TruncatingCharField(
        verbose_name=u'IP-адрес',
        max_length=40,  # maybe ipv6
        blank=True, null=True
    )
    pd = TruncatingCharField(
        verbose_name=u'pd',
        max_length=250,
        blank=True, null=True
    )

    debug = models.TextField(
        verbose_name=u'debug',
        blank=True, null=True
    )
    
    anchor = TruncatingCharField(
        verbose_name=u'anchor',
        max_length=250,
        blank=True, null=True
    )

    @property
    def operation_real_payed(self):
        return self.operation_amount

    class Meta:
        ordering = ('payment_num', )
        verbose_name = _(u'платеж')
        verbose_name_plural = _(u'платежи')
