from django.utils.translation import ugettext_lazy as _

class DiscountType(object):
    PRESSA = 1
    PRESSA_AND_PUBLISHER = 2
    PRESSA_BONUS = 4
    PRESSA_AND_PUBLISHER_BONUS = 8

    CHOICES = (
        (PRESSA,
         _(u' Скидка за наш счет.')),

        (PRESSA_AND_PUBLISHER,
         _(u'Пропорциональная скидка.')),

        (PRESSA_BONUS,
         _(u'Бонус на лицевой счет за наш счет.')),

        (PRESSA_AND_PUBLISHER_BONUS,
         _(u'Бонус на лицевой счет с пропорциональным разделением.')),
    )

    @classmethod
    def is_proportional(cls, discount_type):
        return discount_type == DiscountType.PRESSA_AND_PUBLISHER or \
               discount_type == DiscountType.PRESSA_AND_PUBLISHER_BONUS