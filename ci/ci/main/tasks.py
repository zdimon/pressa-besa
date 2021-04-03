from django.conf import settings
import os
import git
from celery.decorators import task
import subprocess
from django.contrib.auth.models import User
from account.models import Customer
from git import Repo


def normalize_email(email):
    return email.replace('@', '---')



def clear_work_dir(email):
    print('Removing work dir')
    import subprocess
    # remove env path
    env_path = os.path.join(settings.WORK_DIR, email)
    bashCommand = "sudo rm -r %s" % env_path
    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()
    print(error)


@task()
def clear_env(email):
    import subprocess
    # remove env path
    env_path = os.path.join(settings.WORK_DIR, email)
    bashCommand = "sudo rm -r %s" % env_path
    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()
    print(error)

    # remove nginx conf
    nginx_path = os.path.join(
        settings.NGINX_PATH, email)
    os.remove(nginx_path)

    # remove supervisor conf
    filename = '%s.conf' % email
    supervisor_conf_path = os.path.join(
        settings.BASE_DIR, 'configs', 'supervisor', filename)
    os.remove(supervisor_conf_path)


def register_user(env_id):
    from .models import Env
    env = Env.objects.get(pk=env_id)
    user = Customer()
    user.username = env.email
    user.is_active = True
    user.is_staff = True
    user.is_superuser = True
    user.set_password(env.email+'123')
    user.save()
    env.user = user
    env.save()


def git_create_branch(env_id):
    from .models import Env
    env = Env.objects.get(pk=env_id)
    path = os.path.join(settings.WORK_DIR, normalize_email(
        env.email), 'pressa-besa')
    os.chdir(path)
    bname = 'devel-%s' % normalize_email(
        env.email)
    bashCommand = "git branch %s" % bname
    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()
    print(error)
    bashCommand = "git checkout %s" % bname
    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()
    print(error)

    bashCommand = "git push --set-upstream origin %s" % bname
    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()
    print(error)
    '''
    path_from = os.path.join(settings.WORK_DIR, normalize_email(
        env.email), 'pressa-besa')
    repo = Repo(path_from)
    current = repo.create_head(normalize_email(
        env.email))
    current.checkout()
    origin = repo.remote(name='origin')
    repo.head.reference.set_tracking_branch(origin.refs.master).checkout()
    origin.push(normalize_email(
        env.email))
    '''


def create_conf(env_id):
    import subprocess
    from .models import Env
    env = Env.objects.get(pk=env_id)
    localps = os.path.join(settings.WORK_DIR, normalize_email(
        env.email), settings.PROJECT_PATH, 'app', 'local.py.template')
    localpd = os.path.join(settings.WORK_DIR, normalize_email(
        env.email), settings.PROJECT_PATH, 'app', 'local.py')
    bashCommand = "cp %s %s" % (localps, localpd)
    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()
    print(error)


def copy_frontend(env_id):
    import subprocess
    from .models import Env
    env = Env.objects.get(pk=env_id)
    source = settings.FRONTEND_PATH
    dest = os.path.join(settings.WORK_DIR, normalize_email(
        env.email), settings.PROJECT_PATH, 'static')
    bashCommand = "cp -r %s %s" % (source, dest)
    print(bashCommand)
    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()
    print(error)


def django_conf(env_id):
    from .models import Env
    env = Env.objects.get(pk=env_id)
    path = os.path.join(settings.BASE_DIR, 'tpl', '.env')
    os.mkdir(os.path.join(settings.WORK_DIR, normalize_email(
        env.email), settings.PROJECT_PATH, 'logs'))
    with open(path, 'r') as f:
        tpl = f.read()

    tpl = tpl.replace('%db_path%', settings.DB_PATH)
    sname = '%s.%s' % (normalize_email(
        env.email), settings.DOMAIN)
    tpl = tpl.replace('%domain%', sname)
    tpl = tpl.replace('%media_root%', settings.MEDIA_PATH)

    conf_path = os.path.join(
        settings.WORK_DIR, normalize_email(
            env.email), settings.PROJECT_PATH, '.env')
    with open(conf_path, 'w+') as f:
        f.write(tpl)


@task()
def create_dir(env_id):
    from .models import Env
    env = Env.objects.get(pk=env_id)
    login = normalize_email(
        env.email)
    path = os.path.join(settings.WORK_DIR, login)
    print('Creating work dir %s' % path)
    os.mkdir(path)


def restart():
    bashCommand = "sudo service supervisor restart"
    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()
    print(error)

    bashCommand = "sudo service nginx restart"
    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()
    print(error)



def copy_origin(env_id):
    from .models import Env
    env = Env.objects.get(pk=env_id)
    path_to = os.path.join(settings.WORK_DIR, normalize_email(
        env.email), 'pressa-besa')
    path_from = os.path.join(settings.WORK_DIR, 'origin')
    print('Copy origin to %s ' % path_to)
    bashCommand = "cp -r %s/. %s" % (path_from, path_to)
    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()
    print(error)

@task()
def git_clone(env_id):
    from .models import Env
    env = Env.objects.get(pk=env_id)
    path_to = os.path.join(settings.WORK_DIR, normalize_email(
        env.email), 'pressa-besa')
    path_from = os.path.join(settings.WORK_DIR, 'origin')
    bashCommand = "cp -r %s/. %s" % (path_from, path_to)
    # git.Git(path).clone(settings.GIT_URL)
    g = git.cmd.Git(path_from)
    g.pull()
    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()
    print(error)
    git_create_branch(env_id)
    copy_frontend(env_id)
    django_conf(env_id)
    # register_user(env_id)
    restart()


def nginx_conf(env_id):
    from .models import Env
    env = Env.objects.get(pk=env_id)
    path = os.path.join(settings.BASE_DIR, 'tpl', 'nginx_vhost.conf')
    with open(path, 'r') as f:
        tpl = f.read()

    tpl = tpl.replace('%media_path%', settings.MEDIA_PATH)
    sname = '%s.%s' % (normalize_email(
        env.email), settings.DOMAIN)
    tpl = tpl.replace('%server_name%', sname)
    tpl = tpl.replace('%port%', str(env.port))
    conf_path = os.path.join(
        settings.NGINX_PATH, normalize_email(
            env.email))
    with open(conf_path, 'w+') as f:
        f.write(tpl)


def supervisor_conf(env_id):
    from .models import Env
    env = Env.objects.get(pk=env_id)
    path = os.path.join(settings.BASE_DIR, 'tpl', 'supervisor.conf')
    with open(path, 'r') as f:
        tpl = f.read()
    sname = '%s.%s' % (normalize_email(
        env.email), settings.DOMAIN)
    tpl = tpl.replace('%name%', sname)
    tpl = tpl.replace('%port%', str(env.port))
    prj_dir = os.path.join(settings.WORK_DIR, normalize_email(
        env.email), settings.PROJECT_PATH)
    tpl = tpl.replace('%prj_dir%', prj_dir)
    tpl = tpl.replace('%env_dir%', settings.ENV_PATH)
    filename = '%s.conf' % normalize_email(
        env.email)
    conf_path = os.path.join(
        settings.BASE_DIR, 'configs', 'supervisor', filename)
    with open(conf_path, 'w+') as f:
        f.write(tpl)


@task()
def git_push(env_id, task_id):
    from .models import Env, Task2User
    task = Task2User.objects.get(pk=task_id)
    env = Env.objects.get(id=env_id)
    path_from = os.path.join(settings.WORK_DIR, normalize_email(
        env.email), 'pressa-besa')
    repo = Repo(path_from)
    repo.git.add(update=True)
    repo.index.commit('commit from '+env.email+' ci-task: #'+str(task.task.id))
    bname = 'devel-%s' % env.email
    repo.git.push('origin', bname)

@task()
def git_merge_with_master(env_id):
    from .models import Env, Task2User
    env = Env.objects.get(id=env_id)
    path_origin = os.path.join(settings.WORK_DIR, 'origin')
    
    path_work = os.path.join(settings.WORK_DIR, normalize_email(
        env.email), 'pressa-besa')

    ## pull origin repo
    os.chdir(path_origin)
    bashCommand = "git pull"
    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    output, error = process.communicate()
    print(error)
    clear_work_dir(normalize_email(
        env.email))
    create_dir(env_id)
    #git_clone(env_id)
    #copy_origin(env_id)
    #git_create_branch(env_id)

    # # pull work repo

    # os.chdir(path_work)
    # bashCommand = "git pull"
    # process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    # output, error = process.communicate()
    # print(error)

    # ## merge work repo
    # bashCommand = "git merge origin/master --message 'merging'"    process = subprocess.Popen(bashCommand.split(), stdout=subprocess.PIPE)
    # output, error = process.communicate()
    # print(error)