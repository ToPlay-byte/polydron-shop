# Generated by Django 4.1.7 on 2023-06-19 14:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0009_cart'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cart',
            name='price',
        ),
    ]
