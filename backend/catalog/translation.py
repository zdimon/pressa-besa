from modeltranslation.translator import translator, TranslationOptions
from catalog.models import Category


class CategoryTranslationOptions(TranslationOptions):
    fields = ('name', )


translator.register(Category, CategoryTranslationOptions)
