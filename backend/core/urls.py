from django.urls import path
from .views import CadastroVendedorView, CadastroCompradorView

urlpatterns = [
    path('cadastro/vendedor/', CadastroVendedorView.as_view(), name='cad_vendedor'),
    path('cadastro/comprador/', CadastroCompradorView.as_view(), name='cad_comprador'),
]