from django.urls import path
from .views import search, JournalBuyView, signin


urlpatterns = [
    path('signin', signin, name="signin"),
    path('<slug:name_slug>/<slug:issue_name_slug>/buy', JournalBuyView.as_view(), name="journal-buy"),
    path('search', search, name="search"),
    

    #url(r'^(?P<name_slug>[-\w]+)/(?P<issue_name_slug>[-\w]+)/buy$',
    #    JournalBuyView.as_view(), name="journal-buy"),


]
