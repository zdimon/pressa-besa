from django.urls import path
from .views import LoginView, RegistrationView


urlpatterns = [path('login', LoginView.as_view()),
               path('registration', RegistrationView.as_view())
]