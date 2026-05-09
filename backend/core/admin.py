from django.contrib import admin
from .models import Vendedor, Comprador, Produto

# Register your models here.
admin.site.register(Vendedor)
admin.site.register(Comprador)
admin.site.register(Produto)