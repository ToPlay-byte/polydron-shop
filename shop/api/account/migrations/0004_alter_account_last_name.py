# Generated by Django 4.1.7 on 2023-04-23 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0003_alter_account_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='last_name',
            field=models.CharField(max_length=20, null=True, verbose_name='Призвище'),
        ),
    ]
