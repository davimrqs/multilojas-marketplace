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
    chave_pix = models.CharField(max_length=100)
    # Endereço para cálculo de frete
    cep_origem = models.CharField(max_length=8)

    def __str__(self):
        return self.nome_loja

class Comprador(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    cpf = models.CharField(max_length=11, unique=True)
    endereco_completo = models.TextField()
    cep_destino = models.CharField(max_length=8)

    def __str__(self):
        return self.user.username