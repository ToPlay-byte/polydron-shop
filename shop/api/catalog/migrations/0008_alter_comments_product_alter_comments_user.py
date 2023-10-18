# Generated by Django 4.1.7 on 2023-06-11 13:11

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('catalog', '0007_alter_comments_product_alter_comments_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comments',
            name='product',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='catalog.product'),
        ),
        migrations.AlterField(
            model_name='comments',
            name='user',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]