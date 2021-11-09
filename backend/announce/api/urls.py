from django.urls import path
from .views import AnnounceInfoView

urlpatterns = [
    path('info', AnnounceInfoView.as_view()),
]