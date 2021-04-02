# Generated by Django 3.1.7 on 2021-04-02 16:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0002_auto_20210402_1621'),
        ('main', '0006_task_budget'),
    ]

    operations = [
        migrations.CreateModel(
            name='Task2User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.task', verbose_name='Задача')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='account.customer', verbose_name='Пользователь')),
            ],
        ),
    ]
