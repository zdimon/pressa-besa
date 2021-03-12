# from django.urls import path
from .viewsets.journal import JournalViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'journal', JournalViewSet)

urlpatterns = router.urls