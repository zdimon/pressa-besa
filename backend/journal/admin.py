from django.contrib import admin
from .models import Journal, Issue, IssuePage


@admin.register(Journal)
class JournalAdmin(admin.ModelAdmin):
    list_display = ['name', 'name_slug', 'image_tag']
    search_fields = ['name']
    list_filter = ['category']


@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    list_display = ['name', 'journal', 'release_date']


@admin.register(IssuePage)
class IssuePageAdmin(admin.ModelAdmin):
    list_display = ['page', 'paper', 'image_tag']