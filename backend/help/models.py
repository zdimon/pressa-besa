# -*- coding: utf-8 -*-

from django.db import models
from django.db.models.signals import post_save
from django.conf import settings
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.translation import ugettext_lazy as _

from main.models.mixins import CreateUpdateMixin


class Question(CreateUpdateMixin, models.Model):
    email = models.EmailField(verbose_name=_(u'адрес электронной почты'))
    question = models.TextField(verbose_name=_(u'вопрос (обращение) пользователя'))
    answer = models.TextField(verbose_name=_(u'ответ на обращение пользователя'),
                              default='',
                              blank=True, null=True)

    def __unicode__(self):
        return self.question[:150]

    class Meta:
        verbose_name = _(u'вопрос')
        verbose_name_plural = _(u'вопросы')



