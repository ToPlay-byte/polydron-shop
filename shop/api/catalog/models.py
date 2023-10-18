import os.path

from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings

from mptt.models import MPTTModel, TreeForeignKey

from pytils.translit import slugify


def get_poster_path(obj, filename):
    return os.path.join('catalog', str(obj.name), filename)


def get_photos_path(obj, filename):
    return os.path.join('catalog', str(obj.product), filename)


class Product(models.Model):
    name = models.CharField(verbose_name=_("Назва товару"), max_length=100, db_index=True)
    poster = models.ImageField(verbose_name=_("Постер продукту"), upload_to=get_poster_path)
    categories = models.ManyToManyField("Category",verbose_name=_("Категорія"))
    materials = models.ManyToManyField("Material", verbose_name=_("Матеріал"))
    quantity = models.IntegerField(verbose_name=_("Кількість товару на складі"))
    price = models.IntegerField(verbose_name=_("Ціна товару"))
    characters = models.JSONField(verbose_name=_("Додаткові характеристики товару"), null=True, blank=True)
    slug = models.SlugField(editable=False, unique=True)
    description = models.TextField(verbose_name=_("Опис товару"))
    
    class Meta:
        verbose_name = "Товари"
        verbose_name_plural = "Товар"
        
    def __str__(self):
        return str(self.name)
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Category(MPTTModel):
    name = models.CharField(verbose_name=_("Категорія"), max_length=40)
    title = models.BooleanField(verbose_name=_('Це заголовок підкатегорії?'), blank=True, null=True)
    parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    slug = models.SlugField(editable=False, unique=True)

    class MPTTMeta:
        order_insertion_by= ['name']
    
    class Meta:
        verbose_name = "Категорії"
        verbose_name_plural = "Категорія"
        
    def __str__(self):
        return str(self.name)
    
    def save(self, *args, **kwargs):
        self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    
    
    

class Comments(MPTTModel):
    parent = TreeForeignKey('self', on_delete=models.CASCADE, null=True, blank=True, related_name='children')
    advantages = models.CharField(verbose_name='Переваги', max_length=50, null=True, blank=True)
    disadvantages = models.CharField(verbose_name='Недоліки', max_length=50, null=True, blank=True)
    text = models.TextField(verbose_name='Відгук')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, blank=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True)
    

class Material(models.Model):
    name = models.CharField(verbose_name=_("Матеріала"), max_length=10)
    
    class Meta:
        verbose_name = "Матеріал"
        verbose_name_plural = "Матеріал"
        
    def __str__(self):
        return str(self.name)


class Photos(models.Model):
    path = models.ImageField(verbose_name=_("Фотографія"), upload_to=get_photos_path)
    product = models.ForeignKey("Product", verbose_name=_("Продукт"), help_text="Продукт, якому належить фотографія.", on_delete=models.CASCADE, related_name='photos')
    
    class Meta: 
        verbose_name = 'Фотографія продукту'
        verbose_name_plural = 'Фотографії продукту'
        
    def __str__(self):
        return str(self.path)
    
    
class Cart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True)
    quantity = models.IntegerField(verbose_name='Кількість товару')
    total_price = models.IntegerField(verbose_name='Загальна ціна')
    info = models.ForeignKey(Product, related_name='product', on_delete=models.CASCADE, blank=True)


    