from django.contrib import admin
from .models import Transaction, Payment


@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ['owner','operation_amount']


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ['owner','operation_amount']

