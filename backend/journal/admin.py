from django.contrib import admin
from .models import Journal, Issue, IssuePage, PublishingOffice, PurchasedIssues
from modeltranslation.admin import TranslationAdmin


@admin.register(PublishingOffice)
class PublishingOfficeAdmin(TranslationAdmin):
    list_display = ['name_ru']


@admin.register(Journal)
class JournalAdmin(TranslationAdmin):
    list_display = ['name_ru', 'name_slug', 'image_tag', 'publishing_office', 'amount']
    search_fields = ['name']
    list_filter = ['category']
    list_editable = ['amount']


@admin.register(Issue)
class IssueAdmin(admin.ModelAdmin):
    list_display = ['name', 'journal', 'release_date']


@admin.register(IssuePage)
class IssuePageAdmin(admin.ModelAdmin):
    list_display = ['page', 'paper', 'image_tag']


@admin.register(PurchasedIssues)
class PurchasedIssuesAdmin(admin.ModelAdmin):
    list_display = ['customer', 'journal', 'issue', 'purchased_type']