from django.db.models.signals import pre_delete
from .tasks import normalize_email
from django.db import models
from django.db.models.signals import post_save
from django.db.models import Max
from .tasks import create_dir, git_clone, nginx_conf, supervisor_conf, clear_env


class Env(models.Model):
    email = models.CharField(max_length=60, unique=True)
    port = models.IntegerField(default=8080)

    @classmethod
    def post_create(cls, sender, instance, created, *args, **kwargs):
        if created:
            maxp = Env.objects.aggregate(Max('port'))
            print(maxp)
            instance.port = maxp["port__max"]+1
            instance.save()
            create_dir(instance.id)
            git_clone.delay(instance.id)
            nginx_conf(instance.id)
            supervisor_conf(instance.id)
            # restart()


def pre_delete_handler(sender, instance, using, **kwargs):
    clear_env.delay(normalize_email(instance.email))


post_save.connect(Env.post_create, sender=Env)
pre_delete.connect(pre_delete_handler, sender=Env)
