from django.db import models
from main.models.fields import AmountField
from decimal import Decimal
from django.utils.translation import ungettext
from django.utils.translation import ugettext_lazy as _
from main.models.mixins import CreateUpdateMixin
from django.db.models.signals import pre_save
from datetime import timedelta
from django.utils import timezone


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


def initialize_user_subscription(sender, instance, **kwargs):
    if not instance.id:
        instance.count = instance.subscription.count


pre_save.connect(initialize_user_subscription, sender=UserSubscrition)


class Abonement(models.Model):
    title = models.CharField(verbose_name=_(u'Название абонемента'),
                             max_length=100)
    journals = models.ManyToManyField(
        'journal.Journal',
        verbose_name=_(u'Издания доступные по абонементу'))
    cost = AmountField(
        verbose_name=u'стоимость подписки')

    def __unicode__(self):
        return self.title

    def get_journals_array(self):
        out = []
        for j in self.journals.all():
            out.append(j.id)
        return out    

    @property
    def amount(self):
        return self.cost

    def is_from_abonement(self, journal):
        return journal in self.journals.all()

    @staticmethod
    def default():
        return Abonement.objects.get(id=1)

    def get_profit(self, date):
        def last_day_of_month(date):
            if date.month == 12:
                return date.replace(day=31)
            return date.replace(month=date.month+1, day=1) - \
                timedelta(days=1)

        month_start = date.replace(day=1)
        month_end = last_day_of_month(date)

        return reduce(
            lambda res, abonement: res + (month_end - abonement.start_date.date()).days * abonement.real_cost,
            UserAbonement.objects.filter(start_date__gte=month_start,
                                         start_date__lte=month_end),
            0)

    def get_profit_count(self, date):
        def last_day_of_month(date):
            if date.month == 12:
                return date.replace(day=31)
            return date.replace(month=date.month+1, day=1) - \
                timedelta(days=1)

        month_start = date.replace(day=1)
        month_end = last_day_of_month(date)
        return UserAbonement.objects.filter(start_date__gte=month_start,start_date__lte=month_end).count()

    def publisher_profit(self, date, publisher):
        date = date.replace(day=1)
        total_profit = self.get_profit(date)
        total_publishers_profit = Decimal(0.5) * total_profit

        total_read = get_total_read(self, date)
        if total_read == 0:
            return Decimal(0)

        publisher_read = get_publisher_read(self, date, publisher)

        publisher_part = Decimal(publisher_read)/Decimal(total_read)

        return Decimal(total_publishers_profit * publisher_part)

    def journal_profit(self, date, journal):
        date = date.replace(day=1)
        total_profit = self.get_profit(date)
        total_publishers_profit = Decimal(0.5) * total_profit

        total_read = get_total_read(self, date)
        if total_read == 0:
            return Decimal(0)

        journal_read = get_journal_read(journal, date)

        publisher_part = Decimal(journal_read)/Decimal(total_read)

        return Decimal(total_publishers_profit * publisher_part)

    def get_real_cost(self, prolongation):
        discount = self.abonementdiscount_set.filter(
            prolongation__lte=prolongation).order_by("prolongation").first()
        return discount.cost if discount else self.cost

    def get_prices(self):
        """Return JavaScript array with prices"""
        result = []
        result.append((0, self.cost, ))
        for discount in self.abonementdiscount_set.all():
            result.append((discount.prolongation, discount.cost, ))

        return "[{0}]".format(",".join("[{0},{1}]".format(*item)
                                       for item in result))

    class Meta:
        verbose_name = _(u'Абонемент')
        verbose_name_plural = _(u'Абонементы')


class AbonementDiscount(models.Model):
    abonement = models.ForeignKey('subscribe.Abonement', on_delete=models.CASCADE)
    cost = AmountField(verbose_name=_(u'Cтоимость подписки'))
    prolongation = models.PositiveIntegerField(
        verbose_name=_(u'Действиет при покупке от'),
        help_text=_(u'выпусков'))

    def __unicode__(self):
        return _(u'Абонемент на {0} дней за {1}').format(
            self.prolongation,
            self.cost * self.prolongation)

    class Meta:
            verbose_name = _(u'Скидка на Абонемент')
            verbose_name_plural = _(u'Скидки на Абонементы')

class UserAbonement(models.Model):
    user = models.ForeignKey('accounts.Customer', on_delete=models.CASCADE)
    abonement = models.ForeignKey('subscribe.Abonement', on_delete=models.CASCADE)
    start_date = models.DateTimeField(verbose_name=_('Начало подписки'))
    stop_date = models.DateTimeField(verbose_name=_('Окончание подписки'))
    real_cost = AmountField(
        verbose_name=_(u'Cтоимость подписки с учетом скидки'))

    def __unicode__(self):
        return self.user.username

    @classmethod
    def has_abonement(cls, user):
        return cls._abonement_for_user(user).exists()

    @classmethod
    def has_avid_abonement(cls, user):
        return cls._avid_abonement_for_user(user)

    @classmethod
    def left_days(cls, user):
        from django.utils import timezone
        try:
            ab = cls.abonement_for_user(user)
            mdate = ab.stop_date
            rdate = timezone.now()
            delta = (mdate - rdate).days
            return delta
        except:
            return 0

    @property
    def days(self):
        return (self.stop_date - self.start_date).days

    @property
    def cost(self):
        return self.real_cost * self.days

    @classmethod
    def abonement_for_user(cls, user):
        return cls._abonement_for_user(user).get()

    @classmethod
    def _abonement_for_user(cls, user):
        return cls.objects.filter(
            user=user,
            stop_date__gte=timezone.now(),
            abonement_id=1)

    @classmethod
    def _avid_abonement_for_user(cls, user):

        return cls.objects.filter(
            user=user,
            stop_date='2020-04-05',
            abonement_id=1).exists()


    @classmethod
    def create_avid_abonement(cls, user):
        abonement = Abonement.objects.get(id=1)
        
        if not UserAbonement.has_abonement(user):
            UserAbonement.objects.create(
                user=user,
                abonement=abonement,
                start_date='2020-03-26',
                stop_date='2020-04-05'
            )

    class Meta:
        verbose_name = _(u'Абонемент пользователя')
        verbose_name_plural = _(u'Абонементы пользователей')