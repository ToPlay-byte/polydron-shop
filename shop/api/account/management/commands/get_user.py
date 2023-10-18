from django.core.management import BaseCommand
from django.core.management.base import CommandParser

from ...models import Account


class Command(BaseCommand):
    help = "Видалити користувача. Треба вказати електронний адрес користувача"

    def handle(self, *args, **option):
        user = Account.objects.get(email=option['email'])
        print(option)
        if option['delete']:
            user.delete()
        else:
            self.stdout.write(f'Користувач: %s %s' % (user.first_name, user.last_name))
            self.stdout.write(f'Электронна адреса: %s' %  user.email)
            self.stdout.write(f'Номер телефону: %s' %  user.phone)
            

    def add_arguments(self, parser):
        parser.add_argument('email', type=str, help='Вкажіть адресу користувача')
        parser.add_argument('-d', '--delete', action='store_true', help='Видалити користувача')
