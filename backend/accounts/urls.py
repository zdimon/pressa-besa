from django.urls import path
from .views import LoginView, RegistrationView, IsAuthView


urlpatterns = [path('login', LoginView.as_view()),
               path('registration', RegistrationView.as_view()),
               path('is_auth', IsAuthView.as_view())
]