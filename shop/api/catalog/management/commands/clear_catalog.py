from django.core.management import BaseCommand
from django.core.management.base import CommandParser

from ...models import  Product


class Command(BaseCommand):
    help = "Видалити усі продукти"

    def handle(self, *args, **option):
        Product.objects.all().delete()
  
