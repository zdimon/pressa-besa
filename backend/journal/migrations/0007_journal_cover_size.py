# Generated by Django 3.1.7 on 2021-03-25 07:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('journal', '0006_journal_name_slug'),
    ]

    operations = [
        migrations.AddField(
            model_name='journal',
            name='cover_size',
            field=models.CharField(blank=True, default='', max_length=10, null=True, verbose_name='Размеры обложки'),
        ),
    ]
