from django.urls import path
from .air.view import export_journals, export_articles


urlpatterns = [path('air', export_journals),
path('air/articles/<int:id>', export_articles),
]