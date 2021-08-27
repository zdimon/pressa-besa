from django.urls import path
from .views import PagesView


urlpatterns = [path('pages', PagesView.as_view())
]