from django.shortcuts import render
from .forms import EnvForm
from django.shortcuts import redirect
from django.conf import settings
from .models import Env
from .tasks import normalize_email
from .models import Env, Task

from django.shortcuts import redirect
from django.contrib.auth import logout


def logout_view(request):
    logout(request)
    return redirect('/')


def env(request):
    error = None
    message = None
    env = None
    try:
        env = Env.objects.get(user=request.user)
    except:
        error = 'Пока не создана!'

    if request.method == 'POST':
        form = EnvForm(request.POST)
        if form.is_valid():
            obj = form.save()
            obj.user = request.user
            obj.save()
            # import pdb
            # pdb.set_trace()
            message = 'Рабочая область создана!'
            return redirect('/env')
    else:
        form = EnvForm(initial={'email': request.user.username})

    return render(request, 'env.html', {"error": error, "env": env, "form": form, "message": message})


def index(request):
    if request.user.is_authenticated:
        return redirect('/env')
    return render(request, 'index.html')


def tasks(request):
    if not request.user.is_authenticated:
        return redirect('/')
    tasks = Task.objects.all()
    return render(request, 'tasks.html', {"tasks": tasks})


def done(request, id):
    env = Env.objects.get(pk=id)
    link = '%s.%s' % (normalize_email(env.email), settings.DOMAIN)
    return render(request, 'done.html', {'link': link})


def info(request):
    return render(request, 'info.html')
