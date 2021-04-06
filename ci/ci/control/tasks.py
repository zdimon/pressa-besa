from django.conf import settings
import os
import git
from celery.decorators import task
import subprocess
from main.utils import run_command, normalize_email
from main.models import Env
from git import Repo


def git_pull(env_id):
    env = Env.objects.get(pk=env_id)
    path = os.path.join(settings.WORK_DIR, normalize_email(
        env.email), 'pressa-besa')
    os.chdir(path)
    out = run_command('git pull origin master')
    return out


def git_commit(env_id):
    env = Env.objects.get(pk=env_id)
    path = os.path.join(settings.WORK_DIR, normalize_email(
        env.email), 'pressa-besa')
    repo = Repo(path)
    repo.git.add(update=True)
    repo.index.commit('commit from '+env.email)
    return {"error": None, "output": 'Done!'}
    # os.chdir(path)
    # command = "git add ."
    # out = run_command(command)
    # bname = 'devel-%s' % normalize_email(env.email)
    # command = 'git commit -m "commit to %s"' % bname
    # print(command)
    # out = run_command(command)
    # return out


def git_push(env_id):
    env = Env.objects.get(pk=env_id)
    path = os.path.join(settings.WORK_DIR, normalize_email(
        env.email), 'pressa-besa')
    os.chdir(path)
    bname = 'devel-%s' % normalize_email(env.email)
    command = 'git push --set-upstream origin %s' % bname
    # command = 'git push'
    out = run_command(command)
    return out


def git_status(env_id):
    env = Env.objects.get(pk=env_id)
    path = os.path.join(settings.WORK_DIR, normalize_email(
        env.email), 'pressa-besa')
    os.chdir(path)
    out = run_command('git status')
    return out


def git_diff(env_id):
    env = Env.objects.get(pk=env_id)
    path = os.path.join(settings.WORK_DIR, normalize_email(
        env.email), 'pressa-besa')
    os.chdir(path)
    out = run_command('git diff')
    return out
