from django.shortcuts import render
from django.utils.translation import gettext as _
from django.db.models import Q

from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import RetrieveAPIView, ListAPIView
from rest_framework.response import Response

from .models import *
from .serializers import *


class CategoryListAPIView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializers


class ProductListAPIView(ListAPIView):
    serializer_class = ProductSerializers

    
    def get_queryset(self):
        queryset = Product.objects.all()
        category = self.kwargs.get('category', None)
        if category:
            queryset = queryset.filter(Q(categories__slug=category) | Q(categories__parent__slug=category))
        if self.request.GET:
            return queryset.filter(
                Q(price__range=[self.request.GET.get('min', 0), self.request.GET.get('max', 10000)]) 
            ).filter(
                Q(name__icontains=self.request.GET.get('q', ''))
            )
        return queryset
    
    
class ProductAPIView(RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializers
    lookup_field = 'slug'   
    

class CommentsModelViewSet(ModelViewSet):
    queryset = Comments.objects.all()
    serializer_class = CommentsSerializer
    
    
    def get_serializer_context(self):
        context = super(CommentsModelViewSet, self).get_serializer_context()
        context['user'] = self.request.user
        context['product'] = Product.objects.get(name=self.request.data['product_name'])
        parent_id = self.request.data.get('comment_id', None)
        print(parent_id)
        if parent_id:
            context['parent'] = Comments.objects.get(pk=parent_id)
        return context
    
    
    def list(self, request):
        comments = Comments.objects.filter(product__name=request.GET['name'], level=0)
        data = CommentsSerializer(comments, many=True).data
        return Response(data)
    
    def destroy(self, request):
        Comments.objects.get(pk=request.data['comment_id'], user=request.user).delete()
        return Response()
    
    
# class SubCommentModelViewSet(ModelViewSet):
    
    
#     def get_serializer_context(self):
#         return super().get_serializer_context()`
   
    
class ProductModelViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializers
    
    def create(self, request, *args, **kwargs):
        # request.data['description'] = 'fsdafasdfas'
        # request.data['сategories'] = 'Системи скидання'
        
        # print(request)
        # data = request.data
        # new_product = Product()
        # new_product.name = data['name']
        # new_product.description = data['description']
        # new_product.poster = data['poster']
        # new_product.save()
        # new_product.materials.add(Material.objects.get(name=data['materials']))
        # new_product.categories.add( Category.objects.get(name=data['categories']))
        data = request.FILES
        print(data)
        return Response()

    
class SearchListAPIView(ListAPIView):
    
    def get(self, request):
        data = Product.objects.filter(name__contains=self.request.GET['name']).values('name', 'slug')
        return Response(list(data))


class CartModelViewSet(ModelViewSet):
    serializer_class = CartSerializer
    queryset = Cart.objects.all()
    
    def get_object(self):
        product = Product.objects.get(name=self.request.data['info']['name'])
        
        return Cart.objects.get(user=self.request.user, info=product)
    
    def get_serializer_context(self):
        context = super(CartModelViewSet, self).get_serializer_context()
        context['user'] = self.request.user
        context['info'] = Product.objects.get(name=self.request.data['info']['name'])
        return context
    
    def list(self, request):
        cart = Cart.objects.filter(user=request.user)
        data = CartSerializer(cart, many=True).data
        return Response(data)
    
    def destroy(self, request, *args, **kwargs):
        product = Product.objects.get(name=self.request.data['product'])
        Cart.objects.get(user=self.request.user, info=product).delete()
    
        return Response({'success': 'product has been deleted from cart'})
     
        
        
 
 
