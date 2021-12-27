from django.urls import path
from .views import ArticleInfoView, ArticleListView

urlpatterns = [
    path('info', ArticleInfoView.as_view()),
    path('list', ArticleListView.as_view()),
]