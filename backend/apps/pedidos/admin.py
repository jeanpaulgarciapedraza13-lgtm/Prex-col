from django.contrib import admin
from .models import Pedido

@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    list_display = ("codigo", "nombre_cliente", "estado", "fecha_registro")
    search_fields = ("codigo", "nombre_cliente")
    list_filter = ("estado",)
