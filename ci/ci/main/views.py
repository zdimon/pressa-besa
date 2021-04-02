from django.shortcuts import render
from .forms import EnvForm
from django.shortcuts import redirect
from django.conf import settings
from .models import Env
from .tasks import normalize_email
from .models import Env, Task, Task2User

from django.shortcuts import redirect
from django.contrib.auth import logout
from django.contrib import messages


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

    tasks = Task2User.objects.filter(user=request.user)

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

    return render(request, 'env.html', {"error": error, "env": env, "form": form, "message": message, "tasks": tasks})


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


def take_task(request, id):
    task = Task.objects.get(pk=id)
    try:
        Task2User.objects.get(user=request.user, task=task)
        messages.success(
            request, 'Эта задача уже в работе!')
        return redirect('/tasks')
    except:
        t2u = Task2User()
        t2u.user = request.user
        t2u.task = task
        t2u.save()
        messages.success(
            request, 'Задача взята в работу и помещена в раздел Рабочая область')
        return redirect('/tasks')


def del_task(request, id):
    task = Task2User.objects.get(pk=id)
    if task.user == request.user:
        task.delete()
        messages.success(
            request, 'Задача удалена')
    return redirect('/env')
