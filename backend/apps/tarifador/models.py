from django.db import models


class Tarifa(models.Model):
    ZONAS = (
        ("Norte", "Norte"),
        ("Sur", "Sur"),
        ("Centro", "Centro"),
        ("Internacional", "Internacional"),
    )

    zona = models.CharField(max_length=50, choices=ZONAS)
    peso_minimo = models.FloatField()
    peso_maximo = models.FloatField()
    valor = models.DecimalField(max_digits=12, decimal_places=2)

    fecha_registro = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.zona} - ${self.valor}"
