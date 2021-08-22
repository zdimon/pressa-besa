# -*- coding: utf-8 -*-
from django.db import models
from django.utils.translation import ugettext_lazy as _

class Bookmarks(models.Model):
    TYPE = (
        ('pdf', _(u'PDF ридер')),
        ('art', _(u'Текстовый ридер')),
    )
    type = models.CharField(verbose_name=_(u'тип ридера'),
                                    choices=TYPE,
                                    default='pdf',
                                    max_length=3)
    issue = models.ForeignKey('journal.Issue',verbose_name=_(u'выпуск издания'), on_delete=models.CASCADE)
    owner = models.ForeignKey('auth.User', verbose_name=_(u'пользователь'), on_delete=models.CASCADE)
    page = models.SmallIntegerField(verbose_name=_(u'Страница'),default=0, db_index=True)