from .viewsets.journal import JournalViewSet
from rest_framework import routers
from django.urls import path
from .views import JournalView

router = routers.DefaultRouter()
router.register(r'journal', JournalViewSet)

urlpatterns = router.urls


urlpatterns = urlpatterns + [
    path('<slug:name_slug>/<slug:issue_name_slug>',
        JournalView.as_view(), name="journal-issue"),
    path('<slug:name_slug>', JournalView.as_view(), name="journal-detail"),

]
