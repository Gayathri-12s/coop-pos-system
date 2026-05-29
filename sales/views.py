from decimal import Decimal

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .models import Sale, SaleItem
from .serializers import SaleSerializer

from products.models import Product


# Returns all completed sales
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def sale_list(request):

    sales = Sale.objects.all().order_by('-created_at')

    serializer = SaleSerializer(sales, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)


# Creates a new supermarket sale and deducts stock
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_sale(request):

    data = request.data

    items = data.get('items', [])

    payment_method = data.get('payment_method')

    if not items:
        return Response(
            {'error': 'Cart is empty'},
            status=status.HTTP_400_BAD_REQUEST
        )

    subtotal = Decimal('0.00')

    validated_items = []

    # Validate stock before creating sale
    for item in items:

        try:
            product = Product.objects.get(id=item['product'])

        except Product.DoesNotExist:
            return Response(
                {'error': 'Product not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        quantity = int(item['quantity'])

        if product.stock_quantity == 0:
            return Response(
                {
                    'error': f'{product.name} is out of stock'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        if quantity > product.stock_quantity:
            return Response(
                {
                    'error': f'Only {product.stock_quantity} items available for {product.name}'
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        line_total = Decimal(product.price) * quantity

        subtotal += line_total

        validated_items.append({
            'product': product,
            'quantity': quantity,
            'unit_price': product.price,
        })

    vat_amount = subtotal * Decimal('0.05')

    total = subtotal + vat_amount

    # Create sale record
    sale = Sale.objects.create(
        cashier=request.user,
        payment_method=payment_method,
        subtotal=subtotal,
        vat_amount=vat_amount,
        total=total,
    )

    # Create sale items and deduct stock
    for item in validated_items:

        SaleItem.objects.create(
            sale=sale,
            product=item['product'],
            quantity=item['quantity'],
            unit_price=item['unit_price'],
        )

        product = item['product']

        product.stock_quantity -= item['quantity']

        product.save()

    serializer = SaleSerializer(sale)

    return Response(
        serializer.data,
        status=status.HTTP_201_CREATED
    )