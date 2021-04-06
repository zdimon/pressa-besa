from django.urls import path
from .views import control, do_pull, do_status, do_push
urlpatterns = [
    path('control', control),
    path('git/pull/<int:id>', do_pull),
    path('git/push/<int:id>', do_push),
    path('git/status/<int:id>', do_status),
]
