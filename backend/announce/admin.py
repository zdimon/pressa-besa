from django.contrib import admin
from .models import News, Subscribers
# Register your models here.

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ['name', 'text', 'audio_converted']


@admin.register(Subscribers)
class SubscribersAdmin(admin.ModelAdmin):
    list_display = ['email', 'create']