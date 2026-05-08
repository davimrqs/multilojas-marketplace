from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.urls import path
from .views import CadastroVendedorView, CadastroCompradorView, ProdutoListCreateView, MeusProdutosView, ProdutoDetailView

urlpatterns = [
    path('cadastro/vendedor/', CadastroVendedorView.as_view(), name='cad_vendedor'),
    path('cadastro/comprador/', CadastroCompradorView.as_view(), name='cad_comprador'),
    path('produtos/', ProdutoListCreateView.as_view(), name='produtos_list_create'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('meus-produtos/', MeusProdutosView.as_view(), name='meus_produtos'),
    path('produtos/<int:pk>/', ProdutoDetailView.as_view(), name='produto_detail'),
]