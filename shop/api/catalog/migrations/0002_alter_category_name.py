# Generated by Django 4.1.7 on 2023-04-22 15:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(max_length=40, verbose_name='Категорія'),
        ),
    ]