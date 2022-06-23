# Generated by Django 3.2.4 on 2022-06-01 20:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('journal', '0021_issue_file'),
    ]

    operations = [
        migrations.AddField(
            model_name='journal',
            name='about',
            field=models.TextField(blank=True, null=True, verbose_name='об издании'),
        ),
        migrations.AddField(
            model_name='journal',
            name='about_de',
            field=models.TextField(blank=True, null=True, verbose_name='об издании'),
        ),
        migrations.AddField(
            model_name='journal',
            name='about_en',
            field=models.TextField(blank=True, null=True, verbose_name='об издании'),
        ),
        migrations.AddField(
            model_name='journal',
            name='about_ru',
            field=models.TextField(blank=True, null=True, verbose_name='об издании'),
        ),
        migrations.AddField(
            model_name='journal',
            name='name_de',
            field=models.CharField(max_length=250, null=True, verbose_name='наименование издания'),
        ),
        migrations.AddField(
            model_name='journal',
            name='name_en',
            field=models.CharField(max_length=250, null=True, verbose_name='наименование издания'),
        ),
        migrations.AddField(
            model_name='journal',
            name='name_ru',
            field=models.CharField(max_length=250, null=True, verbose_name='наименование издания'),
        ),
        migrations.AddField(
            model_name='publishingoffice',
            name='name_de',
            field=models.CharField(max_length=100, null=True, verbose_name='Название издательства'),
        ),
        migrations.AddField(
            model_name='publishingoffice',
            name='name_en',
            field=models.CharField(max_length=100, null=True, verbose_name='Название издательства'),
        ),
        migrations.AddField(
            model_name='publishingoffice',
            name='name_ru',
            field=models.CharField(max_length=100, null=True, verbose_name='Название издательства'),
        ),
    ]