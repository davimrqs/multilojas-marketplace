from rest_framework import serializers
from .models import User, Vendedor, Comprador

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'telefone']

class VendedorSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Vendedor
        fields = ['user', 'nome_loja', 'descricao_loja', 'chave_pix', 'cep_origem']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data, is_vendedor=True)
        vendedor = Vendedor.objects.create(user=user, **validated_data)
        return vendedor

class CompradorSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Comprador
        fields = ['user', 'cpf', 'endereco_completo', 'cep_destino']

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data, is_comprador=True)
        comprador = Comprador.objects.create(user=user, **validated_data)
        return comprador