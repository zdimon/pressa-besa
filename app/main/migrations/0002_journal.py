# Generated by Django 3.1.7 on 2021-02-24 14:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Journal',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250, verbose_name='наименование издания')),
                ('category', models.ManyToManyField(to='main.Category', verbose_name='Категории в Pressa.ru')),
            ],
        ),
    ]
