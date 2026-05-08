from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticatedOrReadOnly
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
    # Apenas usuários logados podem cadastrar
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        # Aqui acontece a mágica:
        # Buscamos o Vendedor vinculado ao User logado (self.request.user)
        vendedor = Vendedor.objects.get(user=self.request.user)
        serializer.save(vendedor=vendedor)

class MeusProdutosView(generics.ListAPIView):
    serializer_class = ProdutoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Retorna apenas os produtos onde o dono é o usuário que está logado
        return Produto.objects.filter(vendedor__user=self.request.user)
    
class ProdutoDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    permission_classes = [IsAuthenticated] # Apenas logados podem mexer aqui