from django.forms import ModelForm
from .models import Customer


class ProfileForm(ModelForm):

    class Meta:
        model = Customer
        fields = ['name', 'telegram', 'phone_number', 'card']
