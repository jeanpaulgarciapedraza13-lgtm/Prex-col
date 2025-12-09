from django.test import TestCase

# Create your tests here.
from django.test import TestCase
from .models import Pedido

class PedidoModelTestCase(TestCase):

    def test_creacion_pedido(self):
        pedido = Pedido.objects.create(
            codigo="P001",
            nombre_cliente="Juan Pérez",
            direccion="Calle 123",
            telefono="3001234567",
            descripcion="Pedido de prueba"
        )

        # Validamos que se creó correctamente
        self.assertEqual(pedido.codigo, "P001")
        self.assertEqual(pedido.nombre_cliente, "Juan Pérez")
        self.assertEqual(pedido.estado, "pendiente")  # Por defecto
