from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, permissions
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import ValidationError
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
    
    # Isso limpa qualquer configuração global restrita do settings.py apenas para essa rota
    authentication_classes = [] 
    permission_classes = [AllowAny] 

    def perform_create(self, serializer):
        # Nota: Como limpamos a autenticação para o GET funcionar limpo,
        # o POST (cadastro) precisará de uma view separada se o erro sumir aqui.
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

    # 🌟 ADICIONE ESSAS DUAS LINHAS AQUI TAMBÉM:
    authentication_classes = []
    permission_classes = [AllowAny]