from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status

from .models import Product
from .serializers import ProductSerializer


# Returns all active supermarket products
@api_view(['GET'])
def product_list(request):

    products = Product.objects.filter(is_active=True)

    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)