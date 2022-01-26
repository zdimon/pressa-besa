from django.db import models
from decimal import Decimal


class AmountField(models.DecimalField):
    def __init__(self, *args, **kwargs):
        kwargs['max_digits'] = 12
        kwargs['decimal_places'] = 2
        super(AmountField, self).__init__(*args, **kwargs)

    def to_python(self, value):
        try:
            return super(AmountField, self).to_python(
                value).quantize(Decimal("0.01"))
        except AttributeError:
            return None


class TruncatingCharField(models.CharField):
    def __init__(self, *args, **kwargs):
        super(TruncatingCharField, self).__init__(*args, **kwargs)

    def get_prep_value(self, value):
        value = super(TruncatingCharField, self).get_prep_value(value)
        if value:
            return value[:self.max_length]
        return value