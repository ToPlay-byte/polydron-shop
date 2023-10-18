import environ

from .development import *


env = environ.Env()
environ.Env.read_env()

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'USER': env('DB_USER'),
        'NAME':  env('DB_NAME'),
        'PASSWORD': env('DB_PASSWORD'),
        'HOST': 'db',
        'PORT': env('DB_PORT'),
    }
}


SECRET_KEY = os.environ.get()

EMAIL_USE_TLS = True  
EMAIL_HOST = env('EMAIL_HOST') 
EMAIL_PORT = env('EMAIL_PORT')  
EMAIL_HOST_USER = env('EMAIL_HOST_USER') 
EMAIL_HOST_PASSWORD = env('EMAIL_HOST_PASSWORD') 

CELERY_BROKER_URL = env('CELERY_BROKER_URL')
CELERY_RESULT_BACKEND = env('CELERY_RESULT_BACKEND')