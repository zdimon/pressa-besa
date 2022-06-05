# -*- coding: utf-8 -*-

from django.db import models
from django.utils.translation import ugettext_lazy as _

from accounts.models import get_single_object
from main.models.mixins import ActiveMixin, CreateUpdateMixin, GenericRelationMixin
from .options import AbstractCodeModel
from main.models.fields import  AmountField
from .utils import codegenerator


class PromoProgram(ActiveMixin, CreateUpdateMixin, models.Model):
    name = models.CharField(verbose_name=_(u'название промопрограммы'),
                            max_length=30, blank=True, null=True)
    partner = models.ForeignKey('accounts.PartnerCompany',
                                verbose_name=_(u'владелец промопрограммы'), on_delete=models.CASCADE)
    expire = models.DateTimeField(verbose_name=_(u'дата окончания действия промопрограммы'),
                                  blank=True, null=True)

    
    max_promocodes = models.IntegerField(
        verbose_name=_(u'максимальное количество промокодов по программе'),
        default=-1)  # неограниченно

    is_abonement = models.BooleanField(verbose_name=_(u'Промопрограмма для абонемента?'), default=False)
    is_discount = models.BooleanField(verbose_name=_(u'Скидка при покупке?'), default=False)

    months_abonement = models.IntegerField(
        verbose_name=_(u'Количество месяцев по абонементу'),
        default=0)  # неограниченно


    amount = models.PositiveIntegerField(
        verbose_name=_(u'стоимость генерации промокода'), default=0)

    amount_buy = AmountField(
        verbose_name=_(u'стоимость промокода для отчетов'), default=0)

    def __unicode__(self):
        if self.name:
            return self.name
        return _(u'пропрограмма для %(partner)s') % {"partner": self.partner}

    class Meta:
        app_label = 'promo_code'
        verbose_name = _(u'промопрограмма')
        verbose_name_plural = _(u'промопрограммы')

    @classmethod
    def find_by_name_or_id(cls, name_or_id):
        obj = get_single_object(cls.objects.filter(name=name_or_id),
                                u"Multiple promoprograms found for name: %s" % name_or_id)
        if obj:
            return obj
        obj = get_single_object(cls.objects.filter(id=name_or_id),
                                u"Multiple promoprograms found for id: %s" % name_or_id)
        if obj:
            return obj
        raise ValueError("No promoprograms found: %s" % name_or_id)


class AvailableByPromoProgram(GenericRelationMixin, models.Model):
    program = models.ForeignKey('promo_code.PromoProgram',
                                verbose_name=_(u'промопрограмма'),
                                on_delete=models.CASCADE)

    class Meta:
        app_label = 'promo_code'
        verbose_name = _(u'доступно по промопрограмме')
        verbose_name_plural = _(u'доступно по промопрограмме')


class GiftCode(GenericRelationMixin, AbstractCodeModel):
    owner = models.ForeignKey('accounts.Customer',
                              verbose_name=_(u'владелец подарочного кода'),on_delete=models.CASCADE, 
                              related_name='my_giftcode_set')

    def __unicode__(self):
        return _(u'подарочный код - "%(code)s"') % {"code": super(GiftCode, self).__unicode__()}

    class Meta:
        app_label = 'promo_code'
        verbose_name = _(u'подарочный код')
        verbose_name_plural = _(u'подарочные коды')


class PromoCode(AbstractCodeModel):
    program = models.ForeignKey('promo_code.PromoProgram',
                                verbose_name=_(u'промопрограмма'),on_delete=models.CASCADE)

    def __unicode__(self):
        return u"%(code)s" % {"code": super(PromoCode, self).__unicode__()}

    class Meta:
        app_label = 'promo_code'
        verbose_name = _(u'промокод')
        verbose_name_plural = _(u'промокоды')

		
		
class Sheremet(models.Model):
    code = models.CharField(verbose_name=_(u'код'), max_length=20,
                            blank=True, null=True)
    expire = models.DateTimeField(verbose_name=_(u'дата окончания действия'),
                                  blank=True, null=True)

    is_active = models.BooleanField(
        verbose_name=_(u'Активный?'), default=False)

    def __unicode__(self):
        return self.code

    def generate_code(self):
        code = codegenerator(8)
        while self.__class__.objects.filter(code=code).count():
            code = codegenerator(8)
        self.code = code

    def save(self, *args, **kwargs):
        if not self.code:
            self.generate_code()
        return super(Sheremet, self).save(*args, **kwargs)
    class Meta:
        app_label = 'promo_code'
        verbose_name = _(u'промопрограмма Шереметьево')
        verbose_name_plural = _(u'промопрограммы Шереметьево')


