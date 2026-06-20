from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Aqui definimos se o usuário é vendedor ou comprador
    is_vendedor = models.BooleanField(default=False)
    is_comprador = models.BooleanField(default=False)
    telefone = models.CharField(max_length=15, blank=True, null=True)

class Vendedor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    nome_loja = models.CharField(max_length=100)
    descricao_loja = models.TextField(blank=True)
    # Adicionando blank=True e null=True para não travar o cadastro
    chave_pix = models.CharField(max_length=100, blank=True, null=True)
    cep_origem = models.CharField(max_length=8, blank=True, null=True)
    cnpj = models.CharField(max_length=14, blank=True, null=True)
    
    def __str__(self):
        return self.nome_loja

class Comprador(models.Model):
    verbose_name = "Comprador"
    verbose_name_plural = "Compradores"
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    cpf = models.CharField(max_length=11, unique=True)
    endereco_completo = models.TextField()
    cep_destino = models.CharField(max_length=8)

    def __str__(self):
        return self.user.username

class Produto(models.Model):
    verbose_name = "Produto"
    verbose_name_plural = "Produtos"
    vendedor = models.ForeignKey(Vendedor, on_delete=models.CASCADE, related_name='produtos')
    nome = models.CharField(max_length=200)
    descricao = models.TextField()
    preco = models.DecimalField(max_digits=10, decimal_places=2)
    estoque = models.IntegerField(default=0)
    imagem = models.ImageField(upload_to='produtos/', null=True, blank=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome


# MODELS DE PEDIDO COMPLETOS E TOTALMENTE CORRIGIDOS:
class Pedido(models.Model):
    STATUS_CHOICES = [
        ('pendente', 'Pendente'),
        ('pago', 'Pago'),
        ('cancelado', 'Cancelado'),
    ]

    comprador = models.ForeignKey(Comprador, on_delete=models.CASCADE, related_name='pedidos')
    data_criacao = models.DateTimeField(auto_now_add=True)
    valor_frete = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Corrigido: max_length para CharField
    opcao_frete = models.CharField(max_length=50) # Use max_length, não max_digits
    
    total = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Corrigido: max_length para CharField
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pendente')

    def __str__(self):
        return f"Pedido #{self.id} - {self.comprador.user.username}"

class ItemPedido(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name='itens')
    produto = models.ForeignKey(Produto, on_delete=models.CASCADE)
    quantidade = models.IntegerField(default=1)
    preco_unitario = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.quantidade}x {self.produto.nome} (Pedido #{self.pedido.id})"