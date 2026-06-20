from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics
from rest_framework.exceptions import ValidationError

# Importações dos seus modelos e serializers
from .models import Vendedor, Comprador, Produto, Pedido 
from .serializers import VendedorSerializer, CompradorSerializer, ProdutoSerializer, PedidoSerializer 

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
    authentication_classes = [] 
    permission_classes = [AllowAny] 

    def perform_create(self, serializer):
        vendedor = Vendedor.objects.get(user=self.request.user)
        serializer.save(vendedor=vendedor)

class MeusProdutosView(generics.ListAPIView):
    serializer_class = ProdutoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Produto.objects.filter(vendedor__user=self.request.user)
    
class ProdutoDetailView(generics.RetrieveUpdateDestroyAPIView): 
    queryset = Produto.objects.all()
    serializer_class = ProdutoSerializer
    authentication_classes = []
    permission_classes = [AllowAny]

class CriarPedidoView(generics.CreateAPIView):
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        try:
            comprador = Comprador.objects.get(user=self.request.user)
            serializer.save(comprador=comprador, status="pendente")
        except Comprador.DoesNotExist:
            raise ValidationError({"detail": "Usuário autenticado não possui um perfil de comprador válido."})