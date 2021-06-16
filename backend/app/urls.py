
from django.contrib import admin
from django.urls import path, include
from main.views import index

from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions
from accounts.views import LoginView, RegistrationView, logout_view
from rest_framework.authtoken.views import ObtainAuthToken
from accounts.views import preauth
import debug_toolbar

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
    path('preauth', preauth),
    path('export/', include('export.urls')),
    path('cover', include('cover.urls')),
    path('top10/', include('announce.urls')),
    path('catalog/', include('catalog.urls')),
    path('magazines/', include('journal.urls')),
    path('main/', include('main.urls')),
    
    path("v1/api-token-auth/", ObtainAuthToken.as_view()),
    
    path('v1/api/', include([
        path('account/', include('accounts.urls')),
        path('', include('article.urls'))
       
    ])),
    path('api', schema_view.with_ui('swagger', cache_timeout=0), 
    name='schema-swagger-ui'),
    path('doc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('', include('social_django.urls', namespace='social')),
    path('logout/', logout_view, name="logout"),

    path('admin/', admin.site.urls),
    path('__debug__/', include(debug_toolbar.urls)),
]


from django.conf import settings
from django.conf.urls.static import static

urlpatterns = urlpatterns + static(settings.MEDIA_URL, 
                                   document_root=settings.MEDIA_ROOT)
