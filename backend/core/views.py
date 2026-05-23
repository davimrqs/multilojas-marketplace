from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, permissions
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.exceptions import ValidationError
from .models import Vendedor, Comprador, Produto
from .serializers import VendedorSerializer, CompradorSerializer, ProdutoSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


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

    authentication_classes = []
    permission_classes = [AllowAny]

class PublicLojaProdutosView(APIView):
    permission_classes = [AllowAny] # Rota pública

    def get(self, request, vendedor_id):
        try:
            vendedor = Vendedor.objects.get(pk=vendedor_id)
        except Vendedor.DoesNotExist:
            return Response({"error": "Loja não encontrada."}, status=status.HTTP_404_NOT_FOUND)

        # Puxa os produtos dessa loja
        produtos = Produto.objects.filter(vendedor=vendedor)

        # Aplica ordenação por preço se o front-end pedir (ex: ?ordenacao=preco_asc)
        ordenacao = request.query_params.get('ordenacao', None)
        if ordenacao == 'preco_asc':
            produtos = produtos.order_by('preco')
        elif ordenacao == 'preco_desc':
            produtos = produtos.order_by('-preco')

        # Monta a lista de produtos estruturada
        produtos_data = []
        for p in produtos:
            produtos_data.append({
                "id": p.id,
                "nome": p.nome,
                "descricao": p.descricao,
                "preco": p.preco,
                "estoque": p.estoque,
                "imagem": p.imagem.url if p.imagem else None
            })

        # Retorna os dados da loja + a lista de produtos dela
        return Response({
            "loja": {
                "id": vendedor.user.id,
                "nome_loja": vendedor.nome_loja,
                "descricao_loja": vendedor.descricao_loja,
                "username_vendedor": vendedor.user.username
            },
            "produtos": produtos_data
        }, status=status.HTTP_200_OK)


class PublicProdutoDetailView(APIView):
    permission_classes = [AllowAny] # Rota pública

    def get(self, request, produto_id):
        try:
            p = Produto.objects.get(pk=produto_id)
        except Produto.DoesNotExist:
            return Response({"error": "Produto não encontrado."}, status=status.HTTP_404_NOT_FOUND)


        return Response({
            "id": p.id,
            "nome": p.nome,
                "descricao": p.descricao,
                "preco": p.preco,
                "estoque": p.estoque,
                "imagem": p.imagem.url if p.imagem else None,
                "criado_em": p.criado_em,
                "loja": {
                    "id": p.vendedor.user.id,
                    "nome_loja": p.vendedor.nome_loja
                }
        }, status=status.HTTP_200_OK)