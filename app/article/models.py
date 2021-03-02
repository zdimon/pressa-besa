from django.db import models
from django.utils.translation import ugettext_lazy as _


class ArticleCategory(models.Model):
    name = models.CharField(verbose_name=_(u'название'), max_length=150)
    def __unicode__(self):
        return self.name
    class Meta:
        verbose_name = _(u'категория')
        verbose_name_plural = _(u'категории')

class Article(models.Model):
    title = models.CharField(verbose_name=_(u'заголовок'), max_length=150, db_index=True)
    subtitle = models.TextField(verbose_name=_(u'подзаголовок'), blank=True, null=True)
    text = models.TextField(verbose_name=_(u'текст статьи'))
    tags = models.TextField(verbose_name=_(u'теги'))
    etags = models.ManyToManyField('catalog.Tag',verbose_name=_(u'Теги статьи'))
    author = models.CharField(verbose_name=_(u'автор'), max_length=250, blank=True, null=True)
    issue = models.ForeignKey('journal.Issue',
                              verbose_name=_(u'выпуск издания'),
                              on_delete=models.CASCADE)
    category = models.ManyToManyField('catalog.Category',
                                      blank=True,
                                      verbose_name=_(u'Категории в Pressa.ru')
                                     )
    page = models.SmallIntegerField(verbose_name=_(u'Страница'),
                                   default=0, db_index=True)
    order = models.SmallIntegerField(verbose_name=_(u'Порядок'),
                                   default=0, db_index=True)

    published = models.BooleanField(
        verbose_name=_(u'опубликован?'),
        default=False, db_index=True)

    created_at = models.DateField(auto_now_add=True, blank=True, null=True)

