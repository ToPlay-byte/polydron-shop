# Generated by Django 4.2.6 on 2023-10-17 16:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('catalog', '0012_category_slug_alter_cart_user'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='category',
            options={'verbose_name': 'Категорії', 'verbose_name_plural': 'Категорія'},
        ),
    ]
