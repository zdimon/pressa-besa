from .viewsets.article import ArticleViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'article', ArticleViewSet)

urlpatterns = router.urls