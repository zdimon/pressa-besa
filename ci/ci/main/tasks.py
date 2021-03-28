from django.conf import settings
import os
import git
from celery.decorators import task


def create_conf(env_id):
    import subprocess
    from .models import Env
    env = Env.objects.get(pk=env_id)
    localps = os.path.join(settings.WORK_DIR, env.email.replace(
        '@', '---'), settings.PROJECT_PATH, 'app', 'local.py.template')
    localpd = os.path.join(settings.WORK_DIR, env.email.replace(
        '@', '---'), settings.PROJECT_PATH, 'app', 'local.py')
    bashCommand = "cp %s %s" % (localps, localpd)
    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()
    print(error)


def copy_frontend(env_id):
    import subprocess
    from .models import Env
    env = Env.objects.get(pk=env_id)
    source = settings.FRONTEND_PATH
    dest = os.path.join(settings.WORK_DIR, env.email.replace(
        '@', '---'), settings.PROJECT_PATH, 'static')
    bashCommand = "cp -r %s %s" % (source, dest)
    print(bashCommand)
    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()
    print(error)


def django_conf(env_id):
    from .models import Env
    env = Env.objects.get(pk=env_id)
    path = os.path.join(settings.BASE_DIR, 'tpl', 'local.py')
    with open(path, 'r') as f:
        tpl = f.read()

    tpl = tpl.replace('% db_path %', settings.DB_PATH)

    conf_path = os.path.join(
        settings.WORK_DIR, env.email.replace(
            '@', '---'), settings.PROJECT_PATH, 'app', 'local.py')
    with open(conf_path, 'w+') as f:
        f.write(tpl)


@task()
def create_dir(env_id):
    from .models import Env
    env = Env.objects.get(pk=env_id)
    login = env.email.replace('@', '---')
    path = os.path.join(settings.WORK_DIR, login)
    os.mkdir(path)


def restart():
    import subprocess
    bashCommand = "sudo service supervisor restart"
    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()
    print(error)

    bashCommand = "sudo service nginx restart"
    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()
    print(error)


@task()
def git_clone(env_id):
    from .models import Env
    env = Env.objects.get(pk=env_id)
    path = os.path.join(settings.WORK_DIR, env.email.replace('@', '---'))
    git.Git(path).clone(settings.GIT_URL)
    copy_frontend(env_id)
    django_conf(env_id)
    restart()


def nginx_conf(env_id):
    from .models import Env
    env = Env.objects.get(pk=env_id)
    path = os.path.join(settings.BASE_DIR, 'tpl', 'nginx_vhost.conf')
    with open(path, 'r') as f:
        tpl = f.read()

    tpl = tpl.replace('%media_path%', settings.MEDIA_PATH)
    sname = '%s.%s' % (env.email.replace('@', '---'), settings.DOMAIN)
    tpl = tpl.replace('%server_name%', sname)
    tpl = tpl.replace('%port%', str(env.port))
    conf_path = os.path.join(
        settings.NGINX_PATH, env.email.replace('@', '---'))
    with open(conf_path, 'w+') as f:
        f.write(tpl)


def supervisor_conf(env_id):
    from .models import Env
    env = Env.objects.get(pk=env_id)
    path = os.path.join(settings.BASE_DIR, 'tpl', 'supervisor.conf')
    with open(path, 'r') as f:
        tpl = f.read()
    sname = '%s.%s' % (env.email.replace('@', '---'), settings.DOMAIN)
    tpl = tpl.replace('%name%', sname)
    tpl = tpl.replace('%port%', str(env.port))
    prj_dir = os.path.join(settings.WORK_DIR, env.email.replace(
        '@', '---'), settings.PROJECT_PATH)
    tpl = tpl.replace('%prj_dir%', prj_dir)
    tpl = tpl.replace('%env_dir%', settings.ENV_PATH)
    filename = '%s.conf' % env.email.replace('@', '---')
    conf_path = os.path.join(
        settings.BASE_DIR, 'configs', 'supervisor', filename)
    with open(conf_path, 'w+') as f:
        f.write(tpl)