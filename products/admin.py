from django.contrib import admin
from .models import Product


# Admin configuration for Product model
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):

    list_display = (
        'name',
        'category',
        'price',
        'stock_quantity',
        'is_active',
    )

    search_fields = ('name', 'barcode_sku')

    list_filter = ('category', 'is_active')