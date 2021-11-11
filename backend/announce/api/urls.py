from django.urls import path
from .views import AnnounceInfoView, AnnounceSubscribeView

urlpatterns = [
    path('info', AnnounceInfoView.as_view()),
    path('subscribe', AnnounceSubscribeView.as_view()),
]