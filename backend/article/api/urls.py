from django.urls import path
from .views import ArticleInfoView, ArticleListView, CourseListView

urlpatterns = [
    path('info', ArticleInfoView.as_view()),
    # path('list', CourseListView.as_view()),
]