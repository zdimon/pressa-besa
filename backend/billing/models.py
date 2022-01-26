from django.db import models
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericForeignKey
from django.utils.translation import ugettext_lazy as _
from journal.models.extra import DiscountType

from main.models.fields import AmountField
from main.models.fields import TruncatingCharField
from main.models.mixins import CreateUpdateMixin
import datetime
from accounts.models import Customer

class Transaction(CreateUpdateMixin, models.Model):
    """
    Класс описывающий движения по счету поьзователя.
    При начале транзакции флаг подтвержения не установлен.
    Экземпляр класса передается в celery для асинхроного выполнения транзакции
    operation_object - указывает на объект действия, это может быть:
        - журнал, подписка, подарочный код (в случае покупки)
        - модель из приложения для работы с платежной системой
        (в случае пополнения)
    """
    __original_approved = None

    def __init__(self, *args, **kwargs):
        super(Transaction, self).__init__(*args, **kwargs)
        self.__original_approved = int(self.approved)

    BUY = 0
    CASH_PAYMENT_IN = 1
    CASH_PAYMENT_OUT = 2
    RESTORE = 3
    GIFT = 4
    USE_GIFT = 5
    IPAD_READER = 6
    ADMIN_CASH_IN = 7
    ADMIN_CASH_OUT = 8
    CASH_OUT_REMAIN = 9
    REFUND = 10
    BONUS_CASH_PAYMENT_IN = 11
    MAPSHOP = 12

    OPERATION_CHOICES = (
        (BUY, _(u'Покупка на сайте')),
        (RESTORE, _(u'Восстановление денег на счёте')),
        (CASH_PAYMENT_IN, _(u'Начисление на счёт')),
        (CASH_PAYMENT_OUT, _(u'Вывод денег со счёта')),
        (GIFT, _(u'Генерация подарочного кода')),
        (USE_GIFT, _(u'Получение подарка по промокоду')),
        (IPAD_READER, _(u'Покупка через iPad-приложение')),
        (ADMIN_CASH_IN, _(u'Начисление на счет администратором')),
        (ADMIN_CASH_OUT, _(u'Снятие со счета администратором')),
        (CASH_OUT_REMAIN, _(u'Снятие остаточной суммы, при покупке с пополнением счета')),
        (REFUND, _(u'Возврат средств за покупку')),
        (BONUS_CASH_PAYMENT_IN, _(u'Бонус на счёт за покупку по акции')),
        (MAPSHOP, _(u'Покупка товаров "Киоск у дома"')),
    )

    PAYMASTER = 1
    PAYONLINE = 2
    QIWI = 3
    HANDYBANK = 4
    APP_STORE = 5
    SBERBANK = 6

    PAYMENT_SYSTEM_CHOICES = (
        (PAYMASTER, 'paymaster'),
        (PAYONLINE, 'payonline'),
        (QIWI, 'qiwi'),
        (HANDYBANK, 'handybank'),
        (IPAD_READER, 'app store'),
        (SBERBANK, 'sberbank'),
    )
    datetime = models.DateTimeField(verbose_name=u'дата операции',
                                    auto_now=True)
    owner = models.ForeignKey('auth.User', verbose_name=_(u'пользователь'), on_delete=models.CASCADE)
    operation = models.IntegerField(verbose_name=_(u'тип финансовой операции'),
                                    choices=OPERATION_CHOICES)
    payment_system = models.IntegerField(verbose_name=_(u'платёжная система'),
                                         choices=PAYMENT_SYSTEM_CHOICES,
                                         blank=True, null=True)
    operation_amount = AmountField(verbose_name=_(u'заявленная сумма операции'))
    operation_real_payed = AmountField(verbose_name=_(u'реально оплаченная сумма'))

    operation_amount_with_discount = AmountField(verbose_name=_(u'сумма с учетом скидки'),
                                                 blank=True,
                                                 null=True)

    discount_type = models.PositiveIntegerField(verbose_name=_(u'Тип скидки'),
                                                choices=DiscountType.CHOICES,
                                                blank=True,
                                                null=True)

    approved = models.BooleanField(verbose_name=_(u'транзакция подтверждена'),
                                   default=False)
    content_type = models.ForeignKey(ContentType, blank=True, null=True, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField(blank=True, null=True)
    operation_object = GenericForeignKey('content_type', 'object_id')
    itunes_transaction_id = models.CharField(
        verbose_name=_(u'ID транзакции из квитанции App Store'),
        blank=True, null=True, max_length=25)
    additional = models.TextField(verbose_name=_(u'Дополнительная информация'),
                                  blank=True, null=True)
    

    def __str__(self):
        return u'%s %s %s' % (self.owner,
                              self.get_operation_display(),
                              self.operation_object)

    def save(self, **kwargs):
        if self.approved != self.__original_approved and self.operation==1:
            #from django.core.mail import send_mail
            #from mapshop.tasks import mapshop_autobuy
            #mapshop_autobuy.delay(self.owner)
            #mess = 'repl on sum %s' % self.operation_amount
            #send_mail('Replanishment', mess, 'noreply@pressa.ru',['zdimon77@gmail.com'], fail_silently=False)            
            from billing.tasks import check_case_orders
            check_case_orders.delay(self.owner)
        return super(Transaction, self).save(**kwargs)

    class Meta:
        verbose_name = u'денежная транзакция'
        verbose_name_plural = u'денежные транзакции'
        ordering = ['-datetime']

    def get_pay_transaction(self):
        from paymaster.models import Payment as PaymasterPayment
        from payonline.models import Payment as PayonlinePayment
        from qiwi.models import Payment as QiwiPayment
        from handybank.models import Payment as HandybankPaynemt
        from sber_receipt.models import Payment as SberbankPayment

        payment = PaymasterPayment.objects.filter(payment_num=self.id)
        if len(payment) > 0:
            payment[0].pay_system = 'paymaster'
            return payment[0]

        payment = PayonlinePayment.objects.filter(payment_num=self.pk)
        if len(payment) > 0:
            payment[0].pay_system = 'payonline'
            return payment[0]

        payment = QiwiPayment.objects.filter(payment_num=self.pk)
        if len(payment) > 0:
            payment[0].pay_system = 'qiwi'
            return payment[0]

        payment = HandybankPaynemt.objects.filter(payment_num=self.pk)
        if len(payment) > 0:
            payment[0].pay_system = 'handybank'
            return payment[0]

        payment = SberbankPayment.objects.filter(payment_num=self.pk)
        if len(payment) > 0:
            payment[0].pay_system = 'sberbank'
            return payment[0]

        return None

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

