import json
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
from .forms import EnvForm
from django.shortcuts import redirect
from django.conf import settings
from .models import Env
from .tasks import normalize_email, git_push, git_merge_with_master
from .models import Env, Task, Task2User, Commit
from git import Repo
from django.shortcuts import redirect
from django.contrib.auth import logout
from django.contrib import messages
import os


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
        error = 'Ваша Рабочая область пока не создана.'

    tasks = Task2User.objects.filter(user=request.user)
    commits = Commit.objects.filter(user=request.user)

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

    return render(request, 'env.html', {"error": error, "env": env, "form": form, "message": message, "tasks": tasks, "commits": commits})


def index(request):
    if request.user.is_authenticated:
        return redirect('/env')
    return render(request, 'index.html')


def instr(request):
    return render(request, 'instr.html')


@csrf_exempt
def hook(request):
    data = json.loads(request.body)
    if data["action"] == 'closed':
        print(data["pull_request"])
    return HttpResponse('Ok')


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


def done_task(request, id):
    task = Task2User.objects.get(pk=id)
    return render(request, 'done_task.html', {"task": task})


def end_task(request, id):

    #origin = repo.remote(name='origin')
    # origin.push()
    task = Task2User.objects.get(pk=id)
    if task.user == request.user:
        env = Env.objects.get(user=request.user)
        git_push.delay(env.id, id)
        task.is_done = True
        task.save()
        c = Commit()
        c.user = request.user
        c.task = task.task
        c.title = task.task.title
        c.save()
        messages.success(
            request, 'Спасибо! Ваши изменения зафиксированы и отправлены на проверку.')
    return redirect('/env')

def merge_master(request, id):
    git_merge_with_master.delay(id)
    messages.success(
        request, 'Отлично! Теперь Ваш репозиторий синхронизирован с актуальной версией проекта (веткой master).')
    return redirect('/env')
