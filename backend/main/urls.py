from django.urls import path
from .views import search, JournalBuyView, signin, register, signin, sf, publisher


urlpatterns = [
    path('signin', signin, name="signin"),
    path('publisher/<slug:name_slug>', publisher, name="publisher"),
    path('<slug:name_slug>/<slug:issue_name_slug>/buy', JournalBuyView.as_view(), name="journal-buy"),
    path('search', search, name="search"),
    path('register', register, name="register"),
    path('signin', signin, name="signin"),

    #url(r'^(?P<name_slug>[-\w]+)/(?P<issue_name_slug>[-\w]+)/buy$',
    #    JournalBuyView.as_view(), name="journal-buy"),


]
