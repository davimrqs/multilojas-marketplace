from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.db import transaction
from core.models import Carrinho, CarrinhoItem 

from .models import Order, OrderItem

class CheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        
        # 1. Busca o carrinho do usuário
        try:
            cart = Carrinho.objects.get(user=user)
            if not cart.items.exists():
                return Response({"error": "Seu carrinho está vazio."}, status=status.HTTP_400_BAD_REQUEST)
        except Carrinho.DoesNotExist:
            return Response({"error": "Carrinho não encontrado."}, status=status.HTTP_404_NOT_FOUND)

        # 2. Transação atômica: ou salva tudo ou nada, evitando pedidos incompletos
        with transaction.atomic():
            order = Order.objects.create(
                user=user,
                total_price=cart.total_price,
                status='pending'
            )

            # 3. Transfere os itens do carrinho para o pedido fatiando por Vendedor/Loja
            for item in cart.items.all():
                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    vendor=item.product.vendedor, 
                    quantity=item.quantity,
                    price=item.product.preco    
                )

            # 4. Limpa o carrinho do usuário após finalizar a compra
            cart.items.all().delete()

        return Response({
            "message": "Pedido multilojas criado com sucesso!",
            "order_id": order.id,
            "total_price": order.total_price
        }, status=status.HTTP_201_CREATED)