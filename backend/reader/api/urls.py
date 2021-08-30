from django.urls import path
from .views import PagesView, ArticlesView, ArticleDetailView


urlpatterns = [
    path('pages', PagesView.as_view()),
    path('articles', ArticlesView.as_view()),
    path('article', ArticleDetailView.as_view())
]