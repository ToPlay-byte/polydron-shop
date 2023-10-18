from django.urls import path

from rest_framework.urlpatterns import format_suffix_patterns

from .views import *


app_name = 'catalog'


urlpatterns = [
    path("categories/", CategoryListAPIView.as_view(), name='categories'),
    path("products/", ProductListAPIView.as_view(), name='product-list'),
    path("products/<category>", ProductListAPIView.as_view()),
    path("products/detail/<slug>", ProductAPIView.as_view(), name='product-detail'),
    path('search', SearchListAPIView.as_view())
]

product = ProductModelViewSet.as_view({
    'post': 'create'
})

comment = CommentsModelViewSet.as_view({
    'get': 'list',
    'post': 'create', 
    'delete': 'destroy',
    'put': 'update'
})

cart = CartModelViewSet.as_view({
    'post': 'create',
    'delete': 'destroy',
    'get': 'list',
    'put': 'update'
})

urlpatterns += format_suffix_patterns([
    path('product-create', product),
    path('cart', cart, name='cart'),
    path('cart//<pk>', cart, name='cart-delete'),
    path('comment', comment),
    path('comment/<pk>', comment)
])

