# Generated by Django 3.2.4 on 2021-08-19 10:08

from django.db import migrations, models
import django.db.models.deletion
import main.models.fields


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_mailtemplate_alias'),
        ('journal', '0017_journal_is_export_to_air'),
        ('subscribe', '0002_usersubscrition'),
    ]

    operations = [
        migrations.CreateModel(
            name='Abonement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100, verbose_name='Название абонемента')),
                ('cost', main.models.fields.AmountField(decimal_places=2, max_digits=12, verbose_name='стоимость подписки')),
                ('journals', models.ManyToManyField(to='journal.Journal', verbose_name='Издания доступные по абонементу')),
            ],
            options={
                'verbose_name': 'Абонемент',
                'verbose_name_plural': 'Абонементы',
            },
        ),
        migrations.CreateModel(
            name='UserAbonement',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_date', models.DateTimeField(verbose_name='Начало подписки')),
                ('stop_date', models.DateTimeField(verbose_name='Окончание подписки')),
                ('real_cost', main.models.fields.AmountField(decimal_places=2, max_digits=12, verbose_name='Cтоимость подписки с учетом скидки')),
                ('abonement', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='subscribe.abonement')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.customer')),
            ],
            options={
                'verbose_name': 'Абонемент пользователя',
                'verbose_name_plural': 'Абонементы пользователей',
            },
        ),
    ]
