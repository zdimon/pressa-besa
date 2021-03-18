from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils.safestring import mark_safe
from django.conf import settings


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
    cover = models.ImageField(
        verbose_name=_('обложка cтатьи'),
        upload_to='article_cover/%Y/%m/%d/',
        blank=True, null=True)
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

    
    def cover_url(self):
        try:
            return f'{settings.BACKEND_URL}{self.cover.url}'
        except:
            return 'noimage.png'

    @property
    def cover_tag(self):
        return mark_safe(f'<img width="200" src="{self.cover_url()}"  />')

class ArticleFontSetting(models.Model):
    name = models.CharField(verbose_name=_(u'Имя шрифта'), max_length=150)
    file = models.FileField(verbose_name=_(u'Файл'), upload_to='fonts')

    def __str__(self):
        return self.name


class ArticleCoverSetting(models.Model):

    COLORS = (
        ('white', _('Белый')),
        ('black', _('Черный'))
    )

    journal = models.ForeignKey('journal.Journal',
                                verbose_name=_(u'издание'),
                                on_delete=models.CASCADE)
    title_x = models.SmallIntegerField(verbose_name=_(u'Заголовок x'),
                                       default=0)
    title_y = models.SmallIntegerField(verbose_name=_(u'Заголовок y'),
                                       default=0)

    title_size = models.SmallIntegerField(verbose_name=_(u'Размер заголовка'),
                                       default=80)

    title_color = models.CharField(verbose_name=_('Цвет заголовка'),
                                   choices=COLORS,
                                   default='black',
                                   max_length=20)

    number_x = models.SmallIntegerField(verbose_name=_(u'Выпуск x'),
                                        default=0)
    number_y = models.SmallIntegerField(verbose_name=_(u'Выпуск y'),
                                        default=0)

    number_size = models.SmallIntegerField(verbose_name=_(u'Размер номера'),
                                           default=80)
    number_color = models.CharField(verbose_name=_('Цвет номера'),
                                   choices=COLORS,
                                   default='black',
                                   max_length=20)

    category_x = models.SmallIntegerField(verbose_name=_(u'Категория x'),
                                          default=0)
    category_y = models.SmallIntegerField(verbose_name=_(u'Категория y'),
                                          default=0)
                                   
    category_size = models.SmallIntegerField(verbose_name=_(u'Размер категории'),
                                             default=80)
    category_color = models.CharField(verbose_name=_('Цвет категории'),
                                   choices=COLORS,
                                   default='black',
                                   max_length=20)

    font = models.ForeignKey(ArticleFontSetting,
                             verbose_name=_(u'шрифт'),
                             null=True,
                             blank=True,
                             on_delete=models.SET_NULL)

    cover = models.ImageField(
        verbose_name=_('обложка'),
        upload_to='article_template_cover/%Y/%m/%d/',
        blank=True, null=True)

    def cover_url(self):
        try:
            return f'{settings.BACKEND_URL}{self.cover.url}'
        except:
            return 'noimage.png'

    @property
    def cover_tag(self):
        return mark_safe(f'<img width="200" src="{self.cover_url()}"  />')