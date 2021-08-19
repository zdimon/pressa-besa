from django.db import models
from main.models.fields import AmountField
from decimal import Decimal
from django.utils.translation import ungettext
from django.utils.translation import ugettext_lazy as _
from main.models.mixins import CreateUpdateMixin


class BaseSubscription(models.Model):
    """
    Основные поля подписки
    """
    # поле name более не актуально, так как название должно
    # вычисляться динамически, иначе оно не локализуется
    name = models.CharField(verbose_name=_(u'название подписки'),
                            max_length=100)
    cost = AmountField(
        verbose_name=u'стоимость подписки')

    is_public = models.BooleanField(
        verbose_name=_(u'отображать ли на сайте?'),
        default=True)

    is_show_ipad = models.BooleanField(
        verbose_name=_(u'отображать ли в iPad?'),
        default=False)

    ipad_tier_subscription_id = models.CharField(
        verbose_name=_(u"ID tier-а подписки в App Store"), max_length=10,
        blank=True, null=True)

    comment = models.TextField(verbose_name=_(u'комментарий'),
                               blank=True, null=True)

    publishing_pay_part = AmountField(
        verbose_name=_(u'отчисления издательству, в рублях'),
        default=Decimal('0.00'))

    def __unicode__(self):
        return u'%s (%s %s)' % (self.name,
                                self.months,
                                ungettext(u'месяц', u'месяцы', self.months))

    class Meta:
        abstract = True


class Subscription(BaseSubscription):
    """
    Класическая подписка.
    Класическая подписка на N номеров определенного идания.
    """
    count = models.PositiveIntegerField(
        verbose_name=_(u'количество номеров в подписке'),
        blank=True, null=True)
    journal = models.ForeignKey('journal.Journal', verbose_name=_(u'издание'), on_delete=models.CASCADE)

    months = models.PositiveIntegerField(verbose_name=_(u'число месяцев'),
                                         blank=True, null=True)

    def __unicode__(self):
        discount = self.journal.amount * self.count - self.cost
        values = {"issues": self.count,
                  "issues_plural": ungettext(u'выпуск',
                                             u'выпуски', self.count),
                  "months": self.months, "months_plural": ungettext(
                      u'месяц',
                      u'месяцы',
                      self.months),
                  "cost": self.cost,
                  "discount": discount}
        if discount > 0:
            template = _(u'%(issues)d %(issues_plural)s (%(months)d %(months_plural)s) за %(cost)10.2f руб. (экономия %(discount)d руб.)')
        else:
            template = _(u'%(issues)d %(issues_plural)s (%(months)d %(months_plural)s) за %(cost)10.2f руб.')
        return template % values

    class Meta:
        verbose_name = _(u'подписка')
        verbose_name_plural = _(u'подписки')
        ordering = ['journal__name', 'count']


class UserSubscrition(CreateUpdateMixin, models.Model):
    owner = models.ForeignKey(
        'accounts.Customer', verbose_name=_(u'пользователь'), on_delete=models.CASCADE)
    subscription = models.ForeignKey('subscribe.Subscription',
                                     verbose_name=_(u'подписка'), on_delete=models.CASCADE)
    count = models.PositiveIntegerField(
        verbose_name=_(u'количество оставшихся номеров по подписке'))

    def __unicode__(self):
        return (_(u"%(id)s - %(customer)s подписан на %(subscription)s") %
                {'id': self.id,
                 'customer': self.owner,
                 'subscription': self.subscription})

    def journal(self, instance):
        if instance:
            return instance.subscription.journal
        else:
            return None

    def send_notification(self):
        pass
        #  Посылаем уведомление о окончании подписки
        # from massmailer.models import MailerTemplate, MailerLog
        # import json
        # tpl = MailerTemplate.objects.get(id=2)
        # from django import forms
        # f = forms.EmailField()
        # good = True
        # try:
        #     f.clean(self.owner.email)
        #     em = self.owner.email
        # except:
        #     try:
        #         f.clean(self.owner.username)
        #         em = self.owner.username
        #     except:
        #         good = False
        # if good:
        #     l = MailerLog()
        #     l.name = self.owner.username
        #     l.email = em
        #     l.template = tpl
        #     l.is_sent = False
        #     l.priority = 9
        #     l.save()
        #     pars = {"{{username}}": self.owner.username,
        #             "{{link}}": u'<a href="http://pressa.ru/ts/'+str(l.id)+'/'+self.subscription.journal.name_slug+u'">ссылку</a>'}
        #     l.parse_attrs = json.dumps(pars)
        #     l.save()

    class Meta:
        verbose_name = _(u'подписка пользователя')
        verbose_name_plural = _(u'подписки пользователей')