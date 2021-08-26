from django.urls import path
from .views import LoginView, RegistrationView, IsAuthView, add_money


urlpatterns = [path('add/money', add_money),
               path('login', LoginView.as_view()),
               path('registration', RegistrationView.as_view()),
               path('is_auth', IsAuthView.as_view())
]