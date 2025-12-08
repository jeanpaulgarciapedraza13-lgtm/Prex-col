from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", include("apps.core.urls")),
    path("pedidos/", include("apps.pedidos.urls")),
    path("users/", include("apps.users.urls")),
    path("tarifas/", include("apps.tarifador.urls")),
]
