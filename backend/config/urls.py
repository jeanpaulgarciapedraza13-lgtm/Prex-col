from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [

    # JWT
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path("admin/", admin.site.urls),
    path("", include("apps.core.urls")),
    path("pedidos/", include("apps.pedidos.urls")),
    path("users/", include("apps.users.urls")),
    path("tarifas/", include("apps.tarifador.urls")),
]
