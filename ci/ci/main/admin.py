from django.contrib import admin

from .models import Env, Task


@admin.register(Env)
class EnvAdmin(admin.ModelAdmin):
    list_display = ['email', 'link']


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'desc', 'is_done']
