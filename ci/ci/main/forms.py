from django.forms import ModelForm
from .models import Env


class EnvForm(ModelForm):

    class Meta:
        model = Env
        fields = ['email']
