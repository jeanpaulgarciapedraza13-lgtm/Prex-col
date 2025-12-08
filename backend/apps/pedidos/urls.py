from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="pedidos_index"),
    path('', views.listar_pedidos, name='listar_pedidos'),
]
