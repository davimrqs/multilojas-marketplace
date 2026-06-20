from rest_framework import serializers, exceptions
from .models import User, Vendedor, Comprador, Produto, Pedido, ItemPedido

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
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)

    class Meta:
        model = Vendedor
        fields = ['username', 'password', 'email', 'nome_loja', 'chave_pix', 'cep_origem']

    def create(self, validated_data):
        username = validated_data.pop('username')
        password = validated_data.pop('password')
        email = validated_data.pop('email')

        user = User.objects.create_user(
            username=username, 
            password=password, 
            email=email,
            is_vendedor=True
        )

        vendedor = Vendedor.objects.create(user=user, **validated_data)
        return vendedor
    
class CompradorSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Comprador
        fields = ['user', 'cpf', 'endereco_completo', 'cep_destino']

    # 🌟 CORREÇÃO AQUI: Remove hífens ou pontos do CEP enviados pelo React
    def validate_cep_destino(self, value):
        cep_limpo = ''.join(filter(str.isdigit, str(value)))
        if len(cep_limpo) != 8:
            raise serializers.ValidationError("O CEP deve conter exatamente 8 números.")
        return cep_limpo

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        user = User.objects.create_user(**user_data, is_comprador=True)
        comprador = Comprador.objects.create(user=user, **validated_data)
        return comprador
    
class ProdutoSerializer(serializers.ModelSerializer):
    vendedor_nome = serializers.ReadOnlyField(source='vendedor.nome_loja')
    
    class Meta:
        model = Produto
        fields = '__all__'
        read_only_fields = ['vendedor']


class ItemPedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemPedido
        fields = ['produto', 'quantidade', 'preco_unitario']

class PedidoSerializer(serializers.ModelSerializer):
    # Usamos write_only=True para permitir que o JSON envie a lista de itens ao criar
    itens = ItemPedidoSerializer(many=True, write_only=True)

    class Meta:
        model = Pedido
        fields = ['id', 'valor_frete', 'opcao_frete', 'total', 'status', 'itens']

    def create(self, validated_data):
        # Pega os dados dos itens que o frontend enviou
        itens_data = self.context['request'].data.get('itens', [])
        
        # Cria o pedido
        pedido = Pedido.objects.create(**validated_data)
        
        # Cria os itens do pedido
        for item in itens_data:
            ItemPedido.objects.create(
                pedido=pedido,
                # Use .get para evitar erro se o nome da chave for diferente
                produto_id=item.get('produto_id') or item.get('produto'),
                quantidade=item['quantidade'],
                preco_unitario=item['preco_unitario']
            )
        return pedido