from rest_framework import serializers
from .models import User, Vendedor, Comprador, Produto

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'telefone']

class VendedorSerializer(serializers.ModelSerializer):
    # Campos extras para criar o usuário junto com o vendedor
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = Vendedor
        fields = ['id', 'nome_loja', 'cnpj', 'username', 'password']

    def create(self, validated_data):
        # 1. Extrai os dados de login
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        
        # 2. Cria o Usuário no sistema de autenticação
        user = User.objects.create_user(username=username, password=password)
        
        # 3. Cria o Vendedor vinculado a esse novo usuário
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
    
class ProdutoSerializer(serializers.ModelSerializer):
    # Adicione isso para o Serializer não exigir o ID no formulário
    vendedor_nome = serializers.ReadOnlyField(source='vendedor.nome_loja')
    
    class Meta:
        model = Produto
        fields = '__all__'
        read_only_fields = ['vendedor'] # <--- ISSO AQUI É A CHAVE