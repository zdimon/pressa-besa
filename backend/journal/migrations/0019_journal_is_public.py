# Generated by Django 3.2.7 on 2021-11-16 11:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('journal', '0018_purchasedissues'),
    ]

    operations = [
        migrations.AddField(
            model_name='journal',
            name='is_public',
            field=models.BooleanField(default=True, verbose_name='отображать на сайте?'),
        ),
    ]
