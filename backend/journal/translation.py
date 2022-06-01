from modeltranslation.translator import translator, TranslationOptions
from journal.models import Journal, PublishingOffice


class JournalTranslationOptions(TranslationOptions):
    fields = ('name', 'about', )


translator.register(Journal, JournalTranslationOptions)


class PublishingOfficeTranslationOptions(TranslationOptions):
    fields = ('name', )


translator.register(PublishingOffice, PublishingOfficeTranslationOptions)
