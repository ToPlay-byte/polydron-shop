import os.path

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.models import TokenUser

from phonenumber_field.modelfields import PhoneNumberField


class AccountManager(UserManager):
    def create_user(self, email=None, password=None, **other_fields):
        other_fields.setdefault("is_staff", False)
        other_fields.setdefault("is_superuser", False)
        if not password:
            password = other_fields.pop('password', None)
        if not email:
            email = other_fields.pop('email', None)
        if not(email and password):
            raise ValueError('user must have email and password')
        user = self.model(
            email=self.normalize_email(email),
            **other_fields
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email,  password=None, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        user = self.create_user(
            email=email,
            password=password,
            **other_fields
        )
        if other_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if other_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")
        return user
    
        


class Account(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(verbose_name=_('Ім\'я'), max_length=20, null=True, blank=True)
    last_name = models.CharField(verbose_name=_('Призвище'), max_length=20, null=True, blank=True)
    email = models.EmailField(verbose_name='email', unique=True)
    phone = PhoneNumberField(verbose_name='Телефон', null=True, blank=True)
    password = models.CharField(
        verbose_name='Пароль:', max_length=126,
        help_text='Enter your password'
    )
    date_joined = models.DateTimeField(verbose_name="date joined", default=timezone.now, editable=False)
    is_staff = models.BooleanField(verbose_name='Персонал', default=False)
    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(verbose_name='Власник', default=False)
    USERNAME_FIELD = 'email'
    EMAIL_FIELD = 'email'
    REQUIRED_FIELDS = []
    objects = AccountManager()
    
    @property
    def full_name(self):
        return '{0} {1}'.format(self.first_name, self.last_name)
    
    class Meta:
        verbose_name = "Користувач"
        verbose_name_plural = "Користувачі"
  
        
class CustomRefreshToken(RefreshToken):
    @classmethod
    def for_user(cls, user):
        token = super().for_user(user)
        token['phone'] = str(user.phone)
        token['last_name'] = user.last_name
        token['first_name'] = user.first_name
        token['email'] = user.email
        return token

