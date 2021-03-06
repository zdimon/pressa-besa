# Generated by Django 3.1.7 on 2021-03-02 13:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('journal', '0001_initial'),
        ('catalog', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ArticleCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150, verbose_name='название')),
            ],
            options={
                'verbose_name': 'категория',
                'verbose_name_plural': 'категории',
            },
        ),
        migrations.CreateModel(
            name='Article',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(db_index=True, max_length=150, verbose_name='заголовок')),
                ('subtitle', models.TextField(blank=True, null=True, verbose_name='подзаголовок')),
                ('text', models.TextField(verbose_name='текст статьи')),
                ('tags', models.TextField(verbose_name='теги')),
                ('author', models.CharField(blank=True, max_length=250, null=True, verbose_name='автор')),
                ('page', models.SmallIntegerField(db_index=True, default=0, verbose_name='Страница')),
                ('order', models.SmallIntegerField(db_index=True, default=0, verbose_name='Порядок')),
                ('published', models.BooleanField(db_index=True, default=False, verbose_name='опубликован?')),
                ('created_at', models.DateField(auto_now_add=True, null=True)),
                ('category', models.ManyToManyField(blank=True, to='catalog.Category', verbose_name='Категории в Pressa.ru')),
                ('etags', models.ManyToManyField(blank=True, null=True, to='catalog.Tag', verbose_name='Теги статьи')),
                ('issue', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='journal.issue', verbose_name='выпуск издания')),
            ],
        ),
    ]
