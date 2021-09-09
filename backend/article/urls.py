from .viewsets.article import ArticleViewSet
from rest_framework import routers
from django.urls import path
from .views import test_cover, article_list, article_detail, article_search

router = routers.DefaultRouter()
router.register(r'article', ArticleViewSet)

urlpatterns = router.urls

urlpatterns = urlpatterns + [
    path('article/test/cover/<int:id>', test_cover),
    path('article/list', article_list, name="article-list"),
    path('article/detail/<int:id>', article_detail, name="article-detail"),
    path('article/search/<str:key>', article_search, name="article-search"),
]
