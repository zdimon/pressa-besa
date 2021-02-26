
from django.contrib import admin
from django.urls import path
from main.views import index

urlpatterns = [
    path('', index),
    path('admin/', admin.site.urls),
]

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


