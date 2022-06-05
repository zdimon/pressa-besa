# -*- coding: utf-8 -*-

from django.db import models
from django.utils.translation import ugettext_lazy as _

from main.models.mixins import ActiveMixin
from .utils import codegenerator, code_format


class AbstractCodeModel(ActiveMixin, models.Model):
    code = models.CharField(verbose_name=_(u'код'), max_length=20,
                            blank=True, null=True)
    expire = models.DateTimeField(verbose_name=_(u'дата окончания действия'),
                                  blank=True, null=True)
    used = models.ForeignKey('accounts.Customer',
                             verbose_name=_(u'пользователь, использовавший код'),
                             blank=True, null=True,
                             on_delete=models.CASCADE)

    def __unicode__(self):
        return code_format(self.code)

    def generate_code_short(self):
        code = codegenerator(8)
        while self.__class__.objects.filter(code=code).count():
            code = codegenerator(8)
        self.code = code
        self.save()

    def generate_code(self):
        code = codegenerator()
        while self.__class__.objects.filter(code=code).count():
            code = codegenerator()
        self.code = code

    def save(self, *args, **kwargs):
        if not self.code:
            self.generate_code()
        return super(AbstractCodeModel, self).save(*args, **kwargs)

    class Meta:
        abstract = True
