from django.contrib.flatpages.models import FlatPage
from modeltranslation.translator import translator, TranslationOptions
from flatblocks.models import FlatBlock


class FlatPageTranslationOptions(TranslationOptions):
    fields = ('title', 'content',)


translator.register(FlatPage, FlatPageTranslationOptions)


class FlatBlockTranslationOptions(TranslationOptions):
    fields = ('content',)


translator.register(FlatBlock, FlatBlockTranslationOptions)

