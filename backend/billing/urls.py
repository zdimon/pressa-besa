from django.urls import path
from .views import payment_payonline

urlpatterns = [
    path('payonline/<int:customer_id>/<int:sum>', payment_payonline, name="payment-payonline")
]
