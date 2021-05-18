from django.db import models
from django.utils.translation import ugettext_lazy as _

class PublicMixin(models.Model):
    is_public = models.BooleanField(
        verbose_name=_(u'отображать ли на сайте?'),
        default=False)

    def __setattr__(self, name, value):
        try:
            if name == 'is_public':
                self.is_public_original = getattr(self, 'is_public', object)
        except:
            pass
        return super(PublicMixin, self).__setattr__(name, value)

    class Meta:
        abstract = True
