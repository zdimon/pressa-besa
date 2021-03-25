from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from django.utils.timezone import now
from django.utils.safestring import mark_safe
from django.conf import settings


class Issue(models.Model):
    name = models.CharField(verbose_name=_(u'номер выпуска'),
                            max_length=100)

    journal = models.ForeignKey('journal.Journal',
                                verbose_name=_(u'издание'),
                                on_delete=models.CASCADE)

    release_date = models.DateField(verbose_name=_(u'дата выхода выпуска'),
                                    default=now, db_index=True)

    is_public = models.BooleanField(
        verbose_name=_(u'отображать ли на сайте?'),
        default=False)

    @property
    def common_cover(self):
        return 'sadasdsda.png'
        # if (self.is_covers_created):
        #     return self.cover_url_mask.replace('{size}', '205-282')
        # else:
        #     return reverse('mts_get_cover', args=['issue','203-280',self.pk])

    def __str__(self):
        return self.name

