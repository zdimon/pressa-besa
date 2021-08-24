from django.urls import path
from .views import AddBookmarkView


urlpatterns = [path('add', AddBookmarkView.as_view())
]