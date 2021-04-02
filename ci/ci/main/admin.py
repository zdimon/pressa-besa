from django.contrib import admin

from .models import Env, Task, File, Maket, Task2User


class FileInline(admin.TabularInline):
    model = File
    list_display = ['title', 'image', 'thumb']


@admin.register(Env)
class EnvAdmin(admin.ModelAdmin):
    list_display = ['email', 'link']


@admin.register(Maket)
class MaketAdmin(admin.ModelAdmin):
    list_display = ['title', 'image']


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['title', 'desc', 'is_done', 'budget']
    inlines = [FileInline, ]
    list_editable = ['budget']


@admin.register(Task2User)
class Task2UserAdmin(admin.ModelAdmin):
    list_display = ['user', 'task']
