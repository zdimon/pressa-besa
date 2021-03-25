from django.db import models
from django.utils.translation import ugettext as _
import pytils

MAX_SLUG_FIELD_LENGTH = 150
CROPPED_SLUG_FIELD_LENGTH = 50
CROPPED_SLUG_RANDOM_PART = 5


class NameSlugMixin(models.Model):
    name_slug = models.CharField(verbose_name=_(u'Название для URL'), max_length=MAX_SLUG_FIELD_LENGTH, blank=True, null=True)

    def save(self, **kwargs):
        """
        Перегруженный оператор save().
        При сохранении записывает slug от указанного поля в новое поле, если до этого slug не был задан.
        """
        from random import randint

        if self.name_slug is None or self.name_slug == '':
            original_text = self.name
            slug_text = pytils.translit.slugify(original_text)
            if len(slug_text) > CROPPED_SLUG_FIELD_LENGTH:
                slug_text = (slug_text[0:(CROPPED_SLUG_FIELD_LENGTH - CROPPED_SLUG_RANDOM_PART - 1)] + "-"
                             + str(randint(10 ** (CROPPED_SLUG_RANDOM_PART - 1), 10 ** CROPPED_SLUG_RANDOM_PART)))
            self.name_slug = slug_text
        return super(NameSlugMixin, self).save(**kwargs)

    class Meta:
        abstract = True
