from rest_framework import serializers
from .models import Cart, CartItem
from collections import defaultdict

class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    product_price = serializers.ReadOnlyField(source='product.price')
    vendor_username = serializers.ReadOnlyField(source='product.vendor.username')

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_name', 'product_price', 'quantity', 'vendor_username', 'total_price']

class CartSerializer(serializers.ModelSerializer):
    by_stores = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'total_price', 'by_stores']

    def get_by_stores(self, obj):
        grouped = defaultdict(list)
        # Passa por cada item do carrinho e agrupa pelo nome do vendedor (loja)
        for item in obj.items.all():
            vendor = item.product.vendor.username
            item_data = CartItemSerializer(item).data
            grouped[vendor].append(item_data)
        return grouped