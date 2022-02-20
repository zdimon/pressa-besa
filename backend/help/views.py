from django.shortcuts import render
from django.contrib.flatpages.models import FlatPage
from django import forms
from help.models import Question
from django.utils.translation import ugettext_lazy as _


class QuestionForm(forms.ModelForm):
    class Meta:
        model = Question
        exclude = ['answer']


def help(request):
    message = None
    page = FlatPage.objects.get(url='/help/')
    if request.method == "POST":
        form = QuestionForm(request.POST)
        if form.is_valid():
            form.save()
            message = _('Спасибо. Ваше сообщение отправлено.')
    else:
        form = QuestionForm()
    return render(request, 'help/index.html', {"page": page, "form": form, "message": message})
