from django.urls import path
from .views import category_detail


urlpatterns = [
    path('<slug:journal_type>/categories/<slug:category>', category_detail, name="category-detail")
]
