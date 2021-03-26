from django.urls import path, include
from .views import detail

urlpatterns = [
    path('detail/<slug:slug>', detail, name='news_detail')
]