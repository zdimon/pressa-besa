from django.urls import path
from .views import reader_index, get_page
from django.conf.urls.i18n import i18n_patterns


urlpatterns = [
    path('image-reader/<int:issue_id>', reader_index, name="reader"),
    path('text-reader/<int:issue_id>', reader_index, name="text-reader"),
    path('get/page/<int:page_id>/<slug:type>/<int:position>', get_page)
]