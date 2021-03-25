from django.db import models
from utils import create_model
import pytils

MAX_SLUG_FIELD_LENGTH = 150
CROPPED_SLUG_FIELD_LENGTH = 50
CROPPED_SLUG_RANDOM_PART = 5


def SlugTraits(base_filed_name='name'):
    """
    Функция генерирующая Mixin к модели
    Добавляющий _slug поле к указанному полю
    При сохранении в это поле записывается slug от указанного поля
    Описание класса на метаязыке
    class SlugMixin(models.Model):
        base_filed_name + '_slug' = models.CharField(verbose_name=_(u'Название для URL'),max_length=MAX_SLUG_FIELD_LENGTH,blank=True,null=True)
        class Meta:
            abstract = True
    """
    field_name = base_filed_name + '_slug'
    fields = {
        field_name: models.SlugField(verbose_name=_(u'Название для URL'),
                                     max_length=MAX_SLUG_FIELD_LENGTH,
                                     blank=True,
                                     null=True)
    }
    SlugMixin = create_model('SlugMixin', fields=fields, module='main.models', options={'abstract': True})

    def save(self, **kwargs):
        """
        Перегруженный оператор save().
        При сохранении записывает slug от указанного поля в новое поле, если до этого slug не был задан.
        """
        from random import randint

        if getattr(self, field_name) is None or getattr(self, field_name) == '':
            original_text = getattr(self, base_filed_name)
            slug_text = pytils.translit.slugify(original_text)
            if len(slug_text) > CROPPED_SLUG_FIELD_LENGTH:
                slug_text = (slug_text[0:(CROPPED_SLUG_FIELD_LENGTH - CROPPED_SLUG_RANDOM_PART - 1)] + "-"
                             + str(randint(10 ** (CROPPED_SLUG_RANDOM_PART - 1), 10 ** CROPPED_SLUG_RANDOM_PART)))
            setattr(self, field_name, slug_text)
        return super(SlugMixin, self).save(**kwargs)

    setattr(SlugMixin, 'save', save)
    return SlugMixin
