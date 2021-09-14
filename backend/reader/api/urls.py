from django.urls import path
from .views import PagesView, ArticlesView, ArticleDetailView, SettingsView, PageDetailView, PreorderView, MakePaymentView, ArticlesFilterView, IssueListView


urlpatterns = [
    path('pages', PagesView.as_view()),
    path('articles', ArticlesView.as_view()),
    path('articles/filter', ArticlesFilterView.as_view()),
    path('article', ArticleDetailView.as_view()),
    path('settings', SettingsView.as_view()),
    path('page/detail', SettingsView.as_view()),
    path('preorder', PreorderView.as_view()),
    path('make_payment', MakePaymentView.as_view()),
    path('issue/list', IssueListView.as_view()),
]