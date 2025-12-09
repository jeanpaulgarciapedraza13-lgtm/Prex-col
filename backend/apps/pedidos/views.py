from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Pedido
import random, string

def generar_codigo():
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))

class CrearPedidoView(APIView):
    permission_classes = [IsAuthenticated]  # Solo usuarios autenticados
    def post(self, request):
        data = request.data

        pedido = Pedido.objects.create(
            codigo=generar_codigo(),
            nombre_cliente=data["nombre_cliente"],
            direccion=data["direccion"],
            telefono=data["telefono"],
            descripcion=data["descripcion"],
            usuario=request.user  # Asociamos el pedido al usuario logueado
        )

        return Response({"message": "Pedido creado correctamente", "codigo": pedido.codigo})

class ListarPedidosView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        if user.is_staff:  # Admin ve todos los pedidos
            pedidos = Pedido.objects.all()
        else:  # Usuario normal solo ve sus pedidos
            pedidos = Pedido.objects.filter(usuario=user)
        return Response(list(pedidos.values()))

class ActualizarPedidoView(APIView):
    permission_classes = [IsAuthenticated]
    def put(self, request, codigo):
        try:
            pedido = Pedido.objects.get(codigo=codigo)
        except Pedido.DoesNotExist:
            return Response({"error": "Pedido no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        if request.user != pedido.usuario and not request.user.is_staff:
            return Response({"error": "No tienes permiso para actualizar este pedido"}, status=status.HTTP_403_FORBIDDEN)

        pedido.estado = request.data.get("estado", pedido.estado)
        pedido.save()
        return Response({"message": "Pedido actualizado correctamente"})

class EliminarPedidoView(APIView):
    permission_classes = [IsAuthenticated]
    def delete(self, request, codigo):
        try:
            pedido = Pedido.objects.get(codigo=codigo)
        except Pedido.DoesNotExist:
            return Response({"error": "Pedido no encontrado"}, status=status.HTTP_404_NOT_FOUND)

        if request.user != pedido.usuario and not request.user.is_staff:
            return Response({"error": "No tienes permiso para eliminar este pedido"}, status=status.HTTP_403_FORBIDDEN)

        pedido.delete()
        return Response({"message": "Pedido eliminado correctamente"})
