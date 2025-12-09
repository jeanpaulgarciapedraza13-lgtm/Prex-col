from django.urls import path
from .views import (
    RegisterView, 
    LoginView, 
    GetUserView,
    ResetPasswordRequestView,
    ResetPasswordConfirmView
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginView.as_view(), name="login"),
    path("me/", GetUserView.as_view(), name="get_user"),
    path("reset-request/", ResetPasswordRequestView.as_view(), name="reset_request"),
    path("reset-confirm/", ResetPasswordConfirmView.as_view(), name="reset_confirm"),
]
