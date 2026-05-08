from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Vendedor, Comprador, Produto
from .serializers import VendedorSerializer, CompradorSerializer, ProdutoSerializer

class CadastroVendedorView(generics.CreateAPIView):
    queryset = Vendedor.objects.all()
    serializer_class = VendedorSerializer
    permission_classes = [AllowAny]

class CadastroCompradorView(generics.CreateAPIView):
    queryset = Comprador.objects.all()
    serializer_class = CompradorSerializer
    permission_classes = [AllowAny]

class ProdutoListCreateView(generics.ListCreateAPIView):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    permission_classes = [AllowAny] # Depois vamos restringir para apenas vendedores logados

class MeusProdutosView(generics.ListAPIView):
    serializer_class = ProdutoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Retorna apenas os produtos onde o dono é o usuário que está logado
        return Produto.objects.filter(vendedor__user=self.request.user)