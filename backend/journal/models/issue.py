from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils.timezone import now
# from django.utils.safestring import mark_safe
# from django.conf import settings
from django.urls import reverse
from .mixins.cover import CoverMixin
from .mixins.name_slug import NameSlugMixin

class Issue(NameSlugMixin, CoverMixin, models.Model):
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

    cover_url_mask = models.CharField(verbose_name=_(u'маска url обложки'),
                                      max_length=250, default=' ',
                                      blank=True, 
                                      null=True)
    is_covers_created = models.BooleanField(
        verbose_name=_(u'были ли отконвертированы обложки'),
        default=False)

    @property
    def cover(self):
        if self.page_set.count() == 0:
            # если не отконверчено
            return self.journal.default_cover
        return self.page_set.all()[0].file_middle

    @property
    def common_cover(self):
        if (self.is_covers_created):
            return self.cover_url_mask.replace('{size}', '205-282')
        else:
            return reverse('cover_make-cover', args=['issue', '203-280', self.pk])

    @property
    def has_articles(self):
        from article.models import Article
        if Article.objects.filter(issue=self).count()>0:
            return True
        else:
            return False



    def is_paid(self, user):
        from journal.models import PurchasedIssues
        if PurchasedIssues.objects.filter(customer=user, issue=self).count()>0:
            return True
        else:
            return False



    def __str__(self):
        return self.name



