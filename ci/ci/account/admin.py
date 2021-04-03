from django.contrib import admin
from .models import Customer


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['username', 'name', 'amount', 'telegram', 'phone_number', 'card']
