# Generated by Django 3.2.4 on 2021-08-19 11:41

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_mailtemplate_alias'),
        ('journal', '0017_journal_is_export_to_air'),
    ]

    operations = [
        migrations.CreateModel(
            name='PurchasedIssues',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('create', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('update', models.DateTimeField(auto_now=True, verbose_name='Дата изменения')),
                ('purchased_type', models.CharField(choices=[('mirror', 'Разовая покупка c сайта-зеркала'), ('once', 'Разовая покупка c личного счета'), ('subscribe', 'Покупка по подписке'), ('promorcode', 'Покупка по промокоду'), ('giftcode', 'Покупка по подарочному коду'), ('once_add', 'Разовая покупка с пополнением счета'), ('collection', 'Добавление в коллекцию'), ('ipad', 'Покупка через iPad-приложение'), ('add_by_admin', 'Добавление в коллекцию администрацией')], max_length=15, verbose_name='тип покупки')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.customer', verbose_name='пользователь')),
                ('issue', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='journal.issue', verbose_name='печатное издание')),
                ('journal', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='journal.journal', verbose_name='издание')),
            ],
            options={
                'verbose_name': 'приобретение пользователя',
                'verbose_name_plural': 'приобретения пользователей',
                'unique_together': {('issue', 'customer')},
            },
        ),
    ]
