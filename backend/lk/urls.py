from django.urls import path
from lk.views import index, subscription, bookmarks, abonement, payments, collection

urlpatterns = [
    path('index', index),
    path('subscription', subscription),
    path('bookmarks', bookmarks),
    path('abonement', abonement),
    path('collection', collection),
    path('payments', payments)
]