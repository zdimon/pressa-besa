from django.shortcuts import render
from .forms import EnvForm
from django.shortcuts import redirect
from django.conf import settings
from .models import Env
from .tasks import normalize_email


def index(request):
    if request.method == 'POST':
        form = EnvForm(request.POST)
        if form.is_valid():
            obj = form.save()
            return redirect('/done/%s' % obj.id)
    else:
        form = EnvForm()
    return render(request, 'index.html', {"form": form})


def done(request, id):
    env = Env.objects.get(pk=id)
    link = '%s%s' % (normalize_email(env.email), settings.DOMAIN)
    return render(request, 'done.html', {'link': link})


def info(request):
    return render(request, 'info.html')
