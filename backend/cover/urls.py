from django.urls import path
from .views import make_cover


urlpatterns = [path('make/<str:obj>/<str:size>/<int:id>', make_cover, name='cover_make-cover'),
]