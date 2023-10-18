import os

from django.conf import settings  

from celery import Celery



os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings.local_settings')

app = Celery('project')


app.config_from_object('django.conf:settings', namespace='CELERY')

app._autodiscover_tasks(settings.INSTALLED_APPS, 'project')