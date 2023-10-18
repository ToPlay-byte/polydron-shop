from mail_templated import send_mail

from django.contrib.auth import get_user_model
from celery import shared_task

from .models import Product



@shared_task()
def send_mail_exsits(product_id):
    users = get_user_model().objects.all()
    print('hellos')
    for user in users:
        send_mail('mail_templates/product_exsists.html', {},
                  'oleksandr.hnylosyr@gmail.com',
                    [user.email]
                ) 

@shared_task()
def send_mail_new_products(product_id):
    product = Product.objects.get(pk=product_id)
    users = get_user_model().objects.all()
    for user in users:
        send_mail('mail_templates/new_products.html', {'user': user, 'product': product},
                  'oleksandr.hnylosyr@gmail.com', user.email
                ) 