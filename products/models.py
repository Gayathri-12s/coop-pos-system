from django.db import models


# Product model stores supermarket inventory items
class Product(models.Model):

    CATEGORY_CHOICES = [
        ('Grocery', 'Grocery'),
        ('Dairy', 'Dairy'),
        ('Produce', 'Produce'),
        ('Beverages', 'Beverages'),
        ('Snacks', 'Snacks'),
    ]

    name = models.CharField(max_length=255)

    price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES
    )

    stock_quantity = models.PositiveIntegerField(default=0)

    barcode_sku = models.CharField(
        max_length=100,
        unique=True
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    # String representation of product
    def __str__(self):
        return self.name