from django.urls import path
from .views import reader_index

urlpatterns = [
    path('reader', reader_index, name="reader")
]