from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem
from .serializers import CartSerializer, CartItemSerializer
from products.models import Product

class CartView(APIView):
    permission_classes = [IsAuthenticated]

    # 1. BUSCAR O CARRINHO DO USUÁRIO
    def get(self, request):
        # Obtém ou cria o carrinho para o usuário logado
        cart, created = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    # 2. ADICIONAR PRODUTO AO CARRINHO
    def post(self, request):
        cart, created = Cart.objects.get_or_create(user=request.user)
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        product = get_object_or_404(Product, id=product_id)

        # Verifica se o produto já está no carrinho
        cart_item, item_created = CartItem.objects.get_or_create(cart=cart, product=product)
        
        if not item_created:
            # Se já existia, apenas soma a nova quantidade
            cart_item.quantity += quantity
        else:
            # Se acabou de ser criado, define a quantidade inicial
            cart_item.quantity = quantity
        
        cart_item.save()
        return Response({"message": "Produto adicionado ao carrinho com sucesso!"}, status=status.HTTP_201_CREATED)

class CartItemDetailView(APIView):
    permission_classes = [IsAuthenticated]

    # 3. ATUALIZAR QUANTIDADE DE UM ITEM ESPECÍFICO
    def patch(self, request, item_id):
        cart_item = get_object_or_404(CartItem, id=item_id, cart__user=request.user)
        quantity = request.data.get('quantity')

        if quantity is not None and int(quantity) > 0:
            cart_item.quantity = int(quantity)
            cart_item.save()
            return Response({"message": "Quantidade atualizada!"})
        
        return Response({"error": "Quantidade inválida"}, status=status.HTTP_400_BAD_REQUEST)

    # 4. REMOVER ITEM DO CARRINHO
    def delete(self, request, item_id):
        cart_item = get_object_or_404(CartItem, id=item_id, cart__user=request.user)
        cart_item.delete()
        return Response({"message": "Item removido do carrinho."}, status=status.HTTP_204_NO_CONTENT)