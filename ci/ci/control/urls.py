from django.urls import path
from .views import control, do_pull, do_status, do_push, do_diff
urlpatterns = [
    path('control', control),
    path('git/pull/<int:id>', do_pull),
    path('git/push/<int:id>', do_push),
    path('git/status/<int:id>', do_status),
    path('git/diff/<int:id>', do_diff),
]
