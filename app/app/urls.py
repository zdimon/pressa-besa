
from django.contrib import admin
from django.urls import path, include
from main.views import index

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from account.views import LoginView, RegistrationView

schema_view = get_schema_view(
   openapi.Info(title="Pressa API",
                default_version='v1',
                description='''

                    Documentation `ReDoc` view can be found [here](/doc).

                    [admin page](/admin).

                    Authors: zdimon77@gmail.com;

                ''',
                license=openapi.License(name="BSD License"),
                ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)


urlpatterns = [
    path('', index),
    path('v1/', include([
        path('account/', include('account.urls'))
    ])),
    path('api', schema_view.with_ui('swagger', cache_timeout=0), 
    name='schema-swagger-ui'),
    path('doc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('admin/', admin.site.urls),
]


from django.conf import settings
from django.conf.urls.static import static

urlpatterns = urlpatterns + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
