from django.core.management import BaseCommand
from django.core.management.base import CommandParser

from ...models import Account


class Command(BaseCommand):
    help = 'Виводить список усіх користувачів'

    def handle(self, *args, **option):
        users = Account.objects.all()
        first_name = option['first_name']
        last_name = option['last_name']
        admin = option['admin']
        print()
        if option['first_name']:
            users = users.filter(first_name__icontains=first_name)    
        if option['last_name']:
            users = users.filter(last_name__icontains=last_name)
        if option['admin']:
            print(users)
            users = users.filter(is_staff=admin)
            print(users)
        for user in users:
            self.stdout.write(f'Користувач: %s %s' % (user.first_name, user.last_name))
            self.stdout.write(f'Электронна адреса: %s' %  user.email)
            self.stdout.write(f'Номер телефону: %s' %  user.phone)
            
    def add_arguments(self, parser):
        parser.add_argument('--first_name', type=str, help='Пошук за імʼям користувача')
        parser.add_argument('--last_name', type=str, help='Пошук за призвищем мкористувача')
        parser.add_argument('--admin', action='store_true', help='Шукати тільки адміністраторів')