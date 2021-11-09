from django.urls import path
from .views import ArticleInfoView

urlpatterns = [
    path('info', ArticleInfoView.as_view()),
]