from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import *


class CategorySerializers(serializers.ModelSerializer):
    parent = serializers.SlugRelatedField(read_only=True, slug_field='name')
    class Meta:
        model = Category
        fields = "__all__"
        
        
class PhotosSerializers(serializers.ModelSerializer):
    class Meta:
        model = Photos
        fields = ['path']


class ProductSerializers(serializers.ModelSerializer):
    materials = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')
    categories = serializers.SlugRelatedField(many=True, read_only=True, slug_field='name')
    photos = PhotosSerializers(many=True)
    class Meta:
        model = Product
        fields = "__all__"
    
    
class MaterialSerializers(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = "__all__"
        
        
        
        
class CommentsSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField('get_user')
    parent = serializers.SerializerMethodField('get_subcomments')
    
    class Meta: 
        model = Comments
        exclude = ['product']
        
    def get_user(self, obj):
        return {
            'full_name': obj.user.full_name,
            'email': obj.user.email
        }
        
    def get_subcomments(self, obj):
        comments = obj.children.all()
        prepared_comments = []
        for comment in comments:
            info = {
                'id': comment.pk,
                'user': {
                    'full_name': comment.user.full_name,
                    'email': comment.user.email
                },
                'text': comment.text
            }
            prepared_comments.append(info)
        return prepared_comments
    
    def create(self, validate_data):
        return Comments.objects.create(user=self.context['user'], parent=self.context.get('parent', None), product=self.context['product'], **validate_data)
        
    def update(self, instance, validated_data):
        print('hello')
        instance.disadvantages = validated_data.get('disadvantages', instance.disadvantages)
        instance.advantages = validated_data.get('advantages', instance.advantages)
        instance.text = validated_data.get('text', instance.text)
        instance.save()
        return instance
    


class CartSerializer(serializers.ModelSerializer):
    info = serializers.SerializerMethodField('get_info')
    
    class Meta: 
        model = Cart
        exclude = ['id', 'user']
        
    
    def get_info(self, obj):
        return {
            'price': obj.info.price,
            'name': obj.info.name,
            'poster': obj.info.poster.url,
            'slug': obj.info.slug
        }
   
    def create(self, validate_data):
        return Cart.objects.create(user=self.context['user'], info=self.context['info'],  **validate_data)
    
    def update(self, instance, validated_data):
        print('hello from update')
        instance.quantity = validated_data.get('quantity')
        instance.total_price = validated_data.get('total_price')
        instance.save()
        return instance
    