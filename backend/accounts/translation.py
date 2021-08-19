from .models import MailTemplate
from modeltranslation.translator import translator, TranslationOptions


class MailTemplateTranslationOptions(TranslationOptions):
    fields = ('title', 'content',)


translator.register(MailTemplate, MailTemplateTranslationOptions)