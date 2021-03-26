# Generated by Django 3.1.7 on 2021-03-24 14:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('journal', '0003_journal_is_public'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='journal',
            name='is_public',
        ),
        migrations.AddField(
            model_name='issue',
            name='is_public',
            field=models.BooleanField(default=False, verbose_name='отображать ли на сайте?'),
        ),
    ]