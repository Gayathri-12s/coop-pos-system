from rest_framework import serializers
from .models import Product


# Serializer converts Product model into JSON data
class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product

        fields = [
            'id',
            'name',
            'price',
            'category',
            'stock_quantity',
            'barcode_sku',
            'is_active',
        ]