from django.dispatch import receiver
from django.db.models.signals import pre_save
from django.contrib.auth import get_user_model
from django.core.mail import send_mail

from .tasks import send_mail_exsits, send_mail_new_products
from .models import Product


@receiver(pre_save, sender=Product)
def added_new_products(sender, instance, *args, **kwargs):
    pass


@receiver(pre_save, sender=Product)
def check_products(sender, instance, *args, **kwargs):
    try:    
        old_instance = Product.objects.get(pk=instance.pk)
        if old_instance.quantity == 0 and instance.quantity != 0:
            send_mail_exsits.delay(instance.pk) 
    except Product.DoesNotExist:
       send_mail_exsits.delay(instance.pk)