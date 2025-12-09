from django.db import models
from django.conf import settings

class Pedido(models.Model):
    ESTADOS = (
        ("pendiente", "Pendiente"),
        ("en_camino", "En camino"),
        ("entregado", "Entregado"),
        ("cancelado", "Cancelado"),
    )

    codigo = models.CharField(max_length=10, unique=True)
    nombre_cliente = models.CharField(max_length=100)
    direccion = models.CharField(max_length=200)
    telefono = models.CharField(max_length=15)
    descripcion = models.TextField()
    estado = models.CharField(max_length=15, choices=ESTADOS, default="pendiente")
    fecha_registro = models.DateTimeField(auto_now_add=True)
    usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)  # usuario dueño

    def __str__(self):
        return f"{self.codigo} - {self.nombre_cliente}"
