from django.db import models
from django.conf import settings
from core.models import Produto, Vendedor

class Order(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pendente (Aguardando Pagamento)'),
        ('paid', 'Pago'),
        ('cancelled', 'Cancelado'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='orders')
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Pedido #{self.id} de {self.user.username}"

class OrderItem(models.Model):
    DELIVERY_STATUS = [
        ('processing', 'Processando'),
        ('shipped', 'Enviado'),
        ('delivered', 'Entregue'),
    ]

    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Produto, on_delete=models.CASCADE)
    vendor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='vendor_orders')
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    delivery_status = models.CharField(max_length=20, choices=DELIVERY_STATUS, default='processing')

    def __str__(self):
        return f"{self.quantity}x {self.product.name} (Loja: {self.vendor.username})"