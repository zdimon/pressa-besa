from django.contrib import admin
from .models import Category
from modeltranslation.admin import TranslationAdmin

@admin.register(Category)
class CategoryAdmin(TranslationAdmin):
    list_display = ['name_ru', 'show_in_new_catalog']
    list_editable = ['show_in_new_catalog']

