from django.db import models
from django.contrib.auth.models import User
from django.utils.translation import ugettext_lazy as _
from subscribe.models import UserAbonement, Abonement
from main.models.mixins import AddressMixin
from main.models.fields import AmountField

def get_single_object(objects,
                      multiple_error_message="Multiple objects found"):
    if objects.exists():
        if objects.count() == 1:
            return objects.get()
        else:
            raise ValueError(multiple_error_message)
    else:
        return None
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
            'journal').select_related('journal')

    @property
    def has_sf_abonement(self):
        abonement = Abonement.objects.get(pk=2)
        try:
            UserAbonement.objects.get(user=self, abonement=abonement)
            return True
        except Exception as e:
            print(e)
            return False
        return UserAbonement.has_abonement(self)
       


class MailTemplate(models.Model):
    title = models.CharField(blank=True, null=True, max_length=250)
    content = models.TextField(blank=True, null=True)
    alias = models.CharField(blank=True, null=True, max_length=50)


class PartnerCompany(AddressMixin, models.Model):
    name = models.CharField(
        max_length=100,
        verbose_name=_(u"компания-партнёр"))
    amount = AmountField(
        verbose_name=_(u'баланс компании-партнёра'),
        default=0,
    )
    contract_number = models.CharField(
        max_length=100,
        verbose_name=_(u"номер договора по сайту"),
        blank=True, null=True)
    contract_date = models.DateField(
        verbose_name=_(u'дата заключения договора по сайту'),
        blank=True, null=True)
    contract_number_ipad = models.CharField(
        max_length=100,
        verbose_name=_(u"номер договора по iPad"),
        blank=True, null=True)
    contract_date_ipad = models.DateField(
        verbose_name=_(u'дата заключения договора по iPad'),
        blank=True, null=True)
    owner_name = models.CharField(
        verbose_name=_(u"владелец компании"),
        max_length=100)
    email = models.EmailField(
        verbose_name=_(u'электронная почта для контактов'),
        blank=True, null=True)
    report_email = models.EmailField(
        verbose_name=_(u'электронная почта для отсылки отчётов'),
        blank=True, null=True)
    code_1c = models.CharField(
        verbose_name=_(u'код компании-партнёра в 1С'),
        max_length=50, blank=True, null=True)
    reported = models.BooleanField(
        verbose_name=_(u'Отсылать ежемесячные отчеты?'),
        default=False)

    division_of_profit = models.PositiveIntegerField(verbose_name=_(u'коэффициент разделения дохода'), default=50)

    def __unicode__(self):
        return self.name

    @staticmethod
    def autocomplete_search_fields():
        return ("id__iexact", "name__icontains",)

    class Meta:
        verbose_name = _(u'компания-партнёр')
        verbose_name_plural = _(u'компании-партнёры')
        ordering = ['name']