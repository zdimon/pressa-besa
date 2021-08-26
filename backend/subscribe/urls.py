from django.urls import path
from .views import AddAbonementView


urlpatterns = [path('abonement/add', AddAbonementView.as_view())
]