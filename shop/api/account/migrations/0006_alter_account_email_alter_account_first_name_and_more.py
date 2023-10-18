# Generated by Django 4.1.7 on 2023-05-13 10:58

from django.db import migrations, models
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0005_alter_account_phone'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='email',
            field=models.EmailField(max_length=254, unique=True, verbose_name='email'),
        ),
        migrations.AlterField(
            model_name='account',
            name='first_name',
            field=models.CharField(blank=True, max_length=20, null=True, verbose_name="Ім'я"),
        ),
        migrations.AlterField(
            model_name='account',
            name='last_name',
            field=models.CharField(blank=True, max_length=20, null=True, verbose_name='Призвище'),
        ),
        migrations.AlterField(
            model_name='account',
            name='phone',
            field=phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=128, null=True, region=None, verbose_name='Телефон'),
        ),
    ]
