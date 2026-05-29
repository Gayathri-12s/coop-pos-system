from rest_framework import serializers

from .models import Sale, SaleItem


# Serializer for products inside a sale
class SaleItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = SaleItem

        fields = [
            'product',
            'quantity',
            'unit_price',
        ]


# Serializer for complete sale transaction
class SaleSerializer(serializers.ModelSerializer):

    items = SaleItemSerializer(many=True)

    formatted_sale_id = serializers.CharField(
        # source='formatted_sale_id',
        read_only=True
    )

    class Meta:
        model = Sale

        fields = [
            'id',
            'formatted_sale_id',
            'cashier',
            'payment_method',
            'subtotal',
            'vat_amount',
            'total',
            'created_at',
            'items',
        ]

        read_only_fields = [
            'cashier',
        ]