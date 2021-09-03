from django.urls import path
from .views import reader_index

urlpatterns = [
    path('image-reader/<int:issue_id>', reader_index, name="image-reader"),
    path('text-reader/<int:issue_id>', reader_index, name="text-reader")
]