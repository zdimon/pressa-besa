from django.contrib import admin
from .models import Journal, Issue, IssuePage, PublishingOffice, PurchasedIssues


@admin.register(PublishingOffice)
class PublishingOfficeAdmin(admin.ModelAdmin):
    list_display = ['name']


@admin.register(Journal)
class JournalAdmin(admin.ModelAdmin):
    list_display = ['name', 'name_slug', 'image_tag', 'publishing_office', 'amount']
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