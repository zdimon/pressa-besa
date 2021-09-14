
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
from django.conf.urls.i18n import i18n_patterns
from main.views import change_language
from lk.views import lk, replanish

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
    path('rosetta/', include('rosetta.urls')),
    path('preauth', preauth),
    path('export/', include('export.urls')),
    path('', include('reader.urls')),
    
    path("v1/api-token-auth/", ObtainAuthToken.as_view()),
    
    path('v1/api/', include([
        path('account/', include('accounts.urls')),
        path('reader/', include('reader.api.urls')),
        path('bookmarks/', include('bookmarks.urls')),
        path('subscribe/', include('subscribe.urls')),
        path('', include('article.urls'))
       
    ])),
    path('api', schema_view.with_ui('swagger', cache_timeout=0), 
    name='schema-swagger-ui'),
    path('doc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),

    path('', include('social_django.urls', namespace='social')),
    path('logout/', logout_view, name="logout"),

    path('admin/', admin.site.urls),
    path('change_language/', change_language, name='change_language'),


    path('i18n/', include('django.conf.urls.i18n')),

    path('__debug__/', include(debug_toolbar.urls)),
]

from django.contrib.flatpages import views
from translator.views import translate

urlpatterns += i18n_patterns(
    path('', index),
    path('lk', lk),
    path('replanish', replanish, name='replanish'),
    path('cover', include('cover.urls')),
    path('top10/', include('announce.urls')),
    path('catalog/', include('catalog.urls')),
    path('magazines/', include('journal.urls')),
    path('main/', include('main.urls')),
    path('about/', views.flatpage, {'url': '/about/'}, name='about'),
    path('publisher/', views.flatpage, {'url': '/publisher/'}, name='publisher'),
    path('advertiser/', views.flatpage, {'url': '/advertiser/'}, name='advertiser'),
    path('help/', views.flatpage, {'url': '/help/'}, name='help'),
    path('agreement/', views.flatpage, {'url': '/agreement/'}, name='agreement'),
    path('privacy/', views.flatpage, {'url': '/privacy/'}, name='privacy'),
    path('translate', translate),

)

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = urlpatterns + static(settings.MEDIA_URL, 
                                   document_root=settings.MEDIA_ROOT)
