from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.core.mail import send_mail
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()
token_generator = PasswordResetTokenGenerator()


# ===========================
# Registro de usuario
# ===========================
class RegisterView(APIView):
    def post(self, request):
        data = request.data
        email = data.get("email")
        password = data.get("password")
        first_name = data.get("first_name", "")

        if not email or not password:
            return Response({"error": "Email y contraseña son obligatorios"}, status=400)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Este correo ya está registrado"}, status=400)

        user = User.objects.create_user(
            email=email,
            password=password,
            first_name=first_name
        )

        return Response({"message": "Usuario creado correctamente"}, status=201)


# ===========================
# Login con JWT
# ===========================
class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        if not email or not password:
            return Response({"error": "Debe enviar email y contraseña"}, status=400)

        user = authenticate(request, email=email, password=password)
        if not user:
            return Response({"error": "Credenciales inválidas"}, status=400)

        refresh = RefreshToken.for_user(user)
        return Response({
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "user_id": user.id,
            "role": getattr(user, "role", "usuario"),
        })


# ===========================
# Obtener info del usuario autenticado
# ===========================
class GetUserView(APIView):
    def get(self, request):
        user = request.user
        if user.is_anonymous:
            return Response({"error": "No autenticado"}, status=401)

        return Response({
            "email": user.email,
            "role": getattr(user, "role", "usuario")
        })


# ===========================
# Solicitar recuperación de contraseña
# ===========================
class ResetPasswordRequestView(APIView):
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"error": "Debe enviar el email"}, status=400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=400)

        token = token_generator.make_token(user)
        reset_link = f"http://localhost:5173/reset?token={token}&uid={user.id}"

        send_mail(
            "Recuperación de contraseña",
            f"Ingresa aquí para cambiar tu contraseña: {reset_link}",
            "no-reply@prexcol.com",
            [email]
        )

        return Response({"message": "Correo enviado correctamente"}, status=200)


# ===========================
# Confirmar cambio de contraseña
# ===========================
class ResetPasswordConfirmView(APIView):
    def post(self, request):
        uid = request.data.get("uid")
        token = request.data.get("token")
        new_pass = request.data.get("password")

        if not uid or not token or not new_pass:
            return Response({"error": "Faltan datos"}, status=400)

        try:
            user = User.objects.get(id=uid)
        except User.DoesNotExist:
            return Response({"error": "Usuario no existe"}, status=400)

        if not token_generator.check_token(user, token):
            return Response({"error": "Token inválido o expirado"}, status=400)

        user.set_password(new_pass)
        user.save()

        return Response({"message": "Contraseña actualizada correctamente"}, status=200)
