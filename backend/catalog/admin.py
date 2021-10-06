from django.contrib import admin
from .models import Category

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'show_in_new_catalog']
    list_editable = ['show_in_new_catalog']

