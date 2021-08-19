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