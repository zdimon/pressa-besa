from django.contrib import admin
from .models import Category, Journal, Issue, IssuePage

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name']


@admin.register(Journal)
class JournalAdmin(admin.ModelAdmin):
    list_display = ['name', 'image_tag']
    search_fields = ['name']
    list_filter = ['category']

@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    list_display = ['name']

@admin.register(IssuePage)
class IssuePageAdmin(admin.ModelAdmin):
    list_display = ['page']