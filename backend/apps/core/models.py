from django.db import models


class Empresa(models.Model):
    nombre = models.CharField(max_length=150)
    direccion = models.CharField(max_length=200)
    telefono = models.CharField(max_length=20)
    correo = models.EmailField(unique=True)
    nit = models.CharField(max_length=20, unique=True)

    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nombre
