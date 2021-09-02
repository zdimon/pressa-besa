from django.urls import path
from .views import PagesView, ArticlesView, ArticleDetailView, SettingsView, PageDetailView


urlpatterns = [
    path('pages', PagesView.as_view()),
    path('articles', ArticlesView.as_view()),
    path('article', ArticleDetailView.as_view()),
    path('settings', SettingsView.as_view()),
    path('page/detail', SettingsView.as_view())
]