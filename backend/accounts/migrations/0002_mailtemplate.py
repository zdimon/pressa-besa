# Generated by Django 3.2.4 on 2021-08-09 09:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MailTemplate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=250, null=True)),
                ('title_ru', models.CharField(blank=True, max_length=250, null=True)),
                ('title_en', models.CharField(blank=True, max_length=250, null=True)),
                ('title_de', models.CharField(blank=True, max_length=250, null=True)),
                ('content', models.TextField(blank=True, null=True)),
                ('content_ru', models.TextField(blank=True, null=True)),
                ('content_en', models.TextField(blank=True, null=True)),
                ('content_de', models.TextField(blank=True, null=True)),
            ],
        ),
    ]