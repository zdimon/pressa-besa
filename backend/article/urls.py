from .viewsets.article import ArticleViewSet
from rest_framework import routers
from django.urls import path
from .views import test_cover

router = routers.DefaultRouter()
router.register(r'article', ArticleViewSet)

urlpatterns = router.urls

urlpatterns = urlpatterns + [
    path('article/test/cover/<int:id>', test_cover)
]
