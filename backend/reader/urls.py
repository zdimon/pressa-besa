from django.urls import path
from .views import reader_index

urlpatterns = [
    path('reader/<int:issue_id>', reader_index, name="reader")
]