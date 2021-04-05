from django.urls import path
from .views import control, do_pull
urlpatterns = [
    path('control', control),
    path('git/pull/<int:id>', do_pull),
]
