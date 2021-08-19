from django.contrib import admin
from .models import Customer, MailTemplate
from modeltranslation.admin import TranslationAdmin


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['middle_name','amount']


@admin.register(MailTemplate)
class MailTemplateAdmin(TranslationAdmin):
    list_display = ['alias','title']