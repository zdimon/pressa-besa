from django.db import models
from main.models.mixins import CreateUpdateMixin
from accounts.models import Customer
from journal.models import Issue
from django.utils.translation import ugettext_lazy as _


class PurchasedIssues(CreateUpdateMixin, models.Model):
    PURCHASED_TYPES = (
        ('mirror', _(u'Разовая покупка c сайта-зеркала')),
        ('once', _(u'Разовая покупка c личного счета')),
        ('subscribe', _(u'Покупка по подписке')),
        ('promorcode', _(u'Покупка по промокоду')),
        ('giftcode', _(u'Покупка по подарочному коду')),
        ('once_add', _(u'Разовая покупка с пополнением счета')),
        ('collection', _(u'Добавление в коллекцию')),
        ('ipad', _(u'Покупка через iPad-приложение')),
        ('add_by_admin', _(u'Добавление в коллекцию администрацией'))
    )
    customer = models.ForeignKey('accounts.Customer',
                                 verbose_name=_(u'пользователь'), on_delete=models.CASCADE)
    journal = models.ForeignKey('journal.Journal',
                                blank=True, null=True,
                                verbose_name=_(u'издание'), on_delete=models.CASCADE)
    issue = models.ForeignKey('journal.Issue',
                              verbose_name=_(u'печатное издание'), on_delete=models.CASCADE)
    purchased_type = models.CharField(verbose_name=_(u'тип покупки'),
                                      choices=PURCHASED_TYPES,
                                      max_length=15)

    def __str__(self):
        return (_(u"Пользователь %(customer)s приобрел выпуск %(issue)s издания %(journal)s как %(type)s") %
                {"customer": self.customer, "issue": self.issue, "journal": self.journal, "type": self.purchased_type})

    @property
    def related_transactions(self):
        from django.contrib.contenttypes.models import ContentType
        from billing.models import Transaction
        ct = ContentType.objects.get_for_model(Issue)
        return Transaction.objects.filter(owner=self.customer.user_ptr,
                                          object_id=self.issue_id,
                                          content_type=ct)

    def outher_issues(self):
        return PurchasedIssues.objects.filter(
            customer=self.customer,
            issue__journal_id=self.issue.journal_id)

    @staticmethod
    def is_already_buy(customer, issue):
        if not isinstance(customer, Customer):
            return False
        issues = PurchasedIssues.objects.filter(
            customer=customer).values('issue_id')
        return issue.id in map(lambda u: u['issue_id'], issues)

    class Meta:
        app_label = 'journal'
        verbose_name = _(u'приобретение пользователя')
        verbose_name_plural = _(u'приобретения пользователей')
        unique_together = ('issue', 'customer', )