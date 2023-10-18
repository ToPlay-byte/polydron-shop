from django.contrib.auth.backends import ModelBackend
from django.core.exceptions import ObjectDoesNotExist

from .models import Account

class Authentication(ModelBackend):
    def authenticate(self, request, email=None, password=None, **kwargs):
        if not(email and password):
            email = request.POST['username']
            password = request.POST['password']
        try: 
            user = Account.objects.get(email__iexact=email)
        except ObjectDoesNotExist:
            return None
        check_password = user.check_password(password)
        if check_password and self.user_can_authenticate(user):
            return user