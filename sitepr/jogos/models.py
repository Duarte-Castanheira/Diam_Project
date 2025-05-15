from django.db import models
from jogador.models import Jogador

class Jogo(models.Model):
    data = models.DateField()
    hora = models.TimeField()
    adversario = models.CharField(max_length=200)
    resultado = models.CharField(max_length=200)
    local = models.CharField(max_length=200)
    bilhetes_vendidos = models.IntegerField(default=0)
    bilhetes_maximos = models.IntegerField(default=0)

class Convocatoria(models.Model):
    jogo = models.ForeignKey(Jogo, on_delete=models.CASCADE)
    jogadores = models.ManyToManyField(Jogador)

class Bilhete(models.Model):
    jogo = models.ForeignKey(Jogo, on_delete=models.CASCADE)
    preco = models.IntegerField(default=0)
    setor = models.CharField(max_length=200)
    fila = models.IntegerField(default=0)
    lugar = models.IntegerField(default=0)