from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from django.utils.timezone import now
from django.utils.safestring import mark_safe
from django.conf import settings


class IssuePage(models.Model):
    page = models.PositiveIntegerField(verbose_name=_('номер страницы'))
    paper = models.ForeignKey('journal.Issue',
                                verbose_name=_('печатное издание'),
                                related_name='page_set',
                                on_delete=models.CASCADE)
    file_low = models.ImageField(
        verbose_name=_('файл изображения предпросмотра'),
        upload_to='low',
        blank=True, null=True)
    file_middle = models.ImageField(
        verbose_name=_('файл страницы'),
        upload_to='medium')
    file_high = models.ImageField(
        verbose_name=_('файл страницы увеличенный'),
        upload_to='high',
        blank=True, null=True)

    def image_url(self):
        try:
            return self.file_low.url
        except:
            return 'noimage.png'

    @property
    def image_tag(self):
        return mark_safe(f'<img src="{self.image_url()}"  />')

