from django.shortcuts import render
from main.models import *
from .tasks import git_pull, git_status, git_push, git_diff
from django.http import HttpResponse
from django.http import JsonResponse


def control(request):
    envs = Env.objects.all()

    return render(request, 'control.html', {"envs": envs})


def do_pull(request, id):
    rez = git_pull(id)
    return JsonResponse(rez)


def do_push(request, id):
    rez = git_push(id)
    return JsonResponse(rez)


def do_status(request, id):
    rez = git_status(id)
    return JsonResponse(rez)


def do_diff(request, id):
    rez = git_diff(id)
    return JsonResponse(rez)
