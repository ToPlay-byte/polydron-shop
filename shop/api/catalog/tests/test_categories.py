from rest_framework.test import APITestCase

from django.urls import reverse

from ..models import Category
from ..serializers import CategorySerializers


class CategoryAPIViewTestCase(APITestCase):
    def setUp(self) -> None:
        super().setUp()
        Category.objects.create(name='parent')
        Category.objects.create(name='child', parent=Category.objects.get(name='parent'))

    
    def test_categories_list(self):
        url = reverse('catalog:categories')
        response = self.client.get(url)
        categories_list = Category.objects.all()
        serializer = CategorySerializers(data=categories_list, many=True)
        serializer.is_valid()
        self.assertEqual(serializer.data, response.data)
        
    

