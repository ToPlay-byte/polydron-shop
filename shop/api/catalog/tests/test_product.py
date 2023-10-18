from rest_framework.test import APITestCase

from django.urls import reverse

from ..models import Product, Category, Material
from ..serializers import ProductSerializers




class ProductAPITestCase(APITestCase):
    def setUp(self) -> None:
        super().setUp()
        material = Material.objects.create(name='test')
        category = Category.objects.create(name='test')
        self.product = Product.objects.create(name='product_name', quantity=23, price=22, description='nafsdfasdfas dsfasdfas')
        self.product.categories.add(category)
        self.product.materials.add(material)
        
    
   
    def test_list(self):
        url = reverse('catalog:product-list')
        response = self.client.get(url)
        product_list = Product.objects.all()
        serializer_data = ProductSerializers(product_list, many=True).data
        self.assertEqual(200, response.status_code)
        self.assertEqual(serializer_data, response.data)
        
    def test_retrive(self):
        url = reverse('catalog:product-detail', kwargs={'slug': self.product.slug})
        response = self.client.get(url)
        product_detail = Product.objects.get(name='product_name')
        serializer_data = ProductSerializers(product_detail).data
        self.assertEqual(200, response.status_code)
        self.assertEqual(serializer_data, response.data)
        
        
        
        
        
        
        
        
        
        
        
        
        