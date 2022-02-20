from .viewsets.journal import JournalViewSet
from rest_framework import routers
from django.urls import path
from .views import JournalView, all_issues, download_pdf

router = routers.DefaultRouter()
router.register(r'journal', JournalViewSet)

urlpatterns = router.urls


urlpatterns = urlpatterns + [
    path('<slug:name_slug>/<slug:issue_name_slug>',
        JournalView.as_view(), name="journal-issue"),
    path('<slug:name_slug>', JournalView.as_view(), name="journal-detail"),
    path('all/issues/<int:journal_id>', all_issues, name="all-issues"),
    path('download/pdf/<int:issue_id>', download_pdf, name="download-pdf"),

]
