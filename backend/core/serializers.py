from rest_framework import serializers, exceptions
from .models import User, Vendedor, Comprador, Produto

def validate_username(self, value):
    if User.objects.filter(username=value).exists():
        raise serializers.ValidationError("Este nome de usuário já está sendo usado. Escolha outro.")
    return value

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'telefone']

class VendedorSerializer(serializers.ModelSerializer):
    # Definimos os campos de acesso como campos avulsos (virtuais)
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)

    class Meta:
        model = Vendedor
        # Liste EXATAMENTE os campos que estão no seu formulário React
        fields = ['username', 'password', 'email', 'nome_loja', 'chave_pix', 'cep_origem']

    def create(self, validated_data):
        # 1. Removemos os dados de login antes de criar o Vendedor
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        email = validated_data.pop('email')

        # 2. Criamos o Usuário primeiro
        user = User.objects.create_user(
            username=username, 
            password=password, 
            email=email
        )

        # 3. Criamos o Vendedor vinculado ao User criado
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