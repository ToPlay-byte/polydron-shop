from django.contrib import admin

from .models import *


admin.site.empty_value_display = 'Немає'


class PhotosProductAdmin(admin.StackedInline):
    model = Photos
    extra = 5



@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    inlines = [PhotosProductAdmin]
    list_display = ['name', 'price']
    search_fields = ['name']
    ordering = ['name', 'price']
    exclude = ['slug']
    list_filter = ['price']


admin.site.register(Category)

admin.site.register(Material)






    
    

