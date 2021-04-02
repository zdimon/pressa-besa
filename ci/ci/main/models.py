from django.db.models.signals import pre_delete
from .tasks import normalize_email
from django.db import models
from django.db.models.signals import post_save
from django.db.models import Max
from .tasks import create_dir, git_clone, nginx_conf, supervisor_conf, clear_env, normalize_email
from django.contrib.auth.models import User
from django.conf import settings
from django.utils.safestring import mark_safe
from easy_thumbnails.files import get_thumbnailer
from image_cropping.fields import ImageRatioField, ImageCropField
from django.utils.translation import ugettext_lazy as _


class Env(models.Model):
    email = models.CharField(verbose_name='Логин', max_length=60, unique=True)
    port = models.IntegerField(default=8080)
    user = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.CASCADE)

    @property
    def link_url(self):
        return "http://%s.%s" % (normalize_email(self.email), settings.DOMAIN)

    @ property
    def link(self):
        return mark_safe('<a target=_blank href="http://%s.%s">Ссылка на рабочую область</a>' % (normalize_email(self.email), settings.DOMAIN))

    @ classmethod
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


class Task(models.Model):
    title = models.CharField(max_length=250)
    desc = models.TextField()
    is_done = models.BooleanField(default=False)
    budget = models.IntegerField(default=0)

    def __str__(self):
        return self.title


class Maket(models.Model):
    title = models.CharField(verbose_name='Заголовок', max_length=250)
    image = models.ImageField(upload_to='maket')


class File(models.Model):
    title = models.CharField(verbose_name='Заголовок', max_length=250)
    image = ImageCropField(upload_to='files')
    task = models.ForeignKey(
        Task, verbose_name="Задача", on_delete=models.CASCADE)
    cropping = ImageRatioField('image', '80x80')

    @property
    def small_image_url(self):
        try:
            return get_thumbnailer(self.image).get_thumbnail({
                'size': (80, 80),
                'box': self.cropping,
                'crop': 'smart',
            }).url
        except Exception as e:
            print(e)
            return SERVER_NAME + 'static/noimage.png'


class Task2User(models.Model):
    user = models.ForeignKey("account.Customer", verbose_name=_(
        "Пользователь"), on_delete=models.CASCADE)
    task = models.ForeignKey(Task, verbose_name=_(
        "Задача"), on_delete=models.CASCADE)
    is_done = models.BooleanField(default=False)

    @property
    def get_status(self):
        if self.is_done:
            return 'Выполнено'
        else:
            return 'В работе'
