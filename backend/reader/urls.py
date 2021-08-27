from django.urls import path
from .views import image_reader_index, text_reader_index

urlpatterns = [
    path('image-reader/<int:issue_id>', image_reader_index, name="image-reader"),
    path('text-reader/<int:issue_id>', text_reader_index, name="text-reader")
]