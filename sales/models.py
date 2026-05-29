from django.db import models
from django.contrib.auth.models import User
from products.models import Product


# Sale model stores completed transactions
class Sale(models.Model):

    PAYMENT_CHOICES = [
        ('Cash', 'Cash'),
        ('Card', 'Card'),
    ]

    cashier = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    payment_method = models.CharField(
        max_length=20,
        choices=PAYMENT_CHOICES
    )

    subtotal = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    vat_amount = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    total = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    created_at = models.DateTimeField(auto_now_add=True)

    # Returns formatted sale ID like COOP-0001
    def formatted_sale_id(self):
        return f"COOP-{self.id:04d}"

    # String representation of sale
    def __str__(self):
        return self.formatted_sale_id()


# SaleItem model stores products inside each sale
class SaleItem(models.Model):

    sale = models.ForeignKey(
        Sale,
        on_delete=models.CASCADE,
        related_name='items'
    )

    product = models.ForeignKey(
        Product,
        on_delete=models.CASCADE
    )

    quantity = models.PositiveIntegerField()

    unit_price = models.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    # String representation of sale item
    def __str__(self):
        return f"{self.product.name} x {self.quantity}"