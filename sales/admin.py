from django.contrib import admin
from .models import Sale, SaleItem


# Admin configuration for Sale model
@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):

    list_display = (
        'id',
        'cashier',
        'payment_method',
        'total',
        'created_at',
    )


# Admin configuration for SaleItem model
@admin.register(SaleItem)
class SaleItemAdmin(admin.ModelAdmin):

    list_display = (
        'sale',
        'product',
        'quantity',
        'unit_price',
    )