from django.contrib import admin

from .models import Env

@admin.register(Env)
class EnvAdmin(admin.ModelAdmin):
    list_display = ['email','port']