from django.urls import path
from .views import CrearPedidoView, ListarPedidosView, ActualizarPedidoView, EliminarPedidoView

urlpatterns = [
    path("create/", CrearPedidoView.as_view()),
    path("list/", ListarPedidosView.as_view()),
    path("update/<str:codigo>/", ActualizarPedidoView.as_view()),
    path("delete/<str:codigo>/", EliminarPedidoView.as_view()),
]
