from django.db import models
from jogador.models import Jogador

class Adversario(models.Model):
    nome = models.CharField(max_length=200)
    imagem = models.ImageField(upload_to='Jogos/', default='Adversarios/logo_clube.png')

class Convocatoria(models.Model):
    jogadores = models.ManyToManyField(Jogador)

class Jogo(models.Model):
    imagem = models.ImageField(upload_to='Jogos/', default='Jogos/logo_clube.png')
    data = models.DateField()
    hora = models.TimeField()
    adversario = models.ForeignKey(Adversario, on_delete=models.CASCADE)
    resultado = models.CharField(max_length=200,blank=True)
    local = models.CharField(max_length=200)
    bilhetes_vendidos = models.IntegerField(default=0)
    bilhetes_maximos = models.IntegerField(default=0)
    convocatoria = models.ForeignKey(Convocatoria, on_delete=models.CASCADE, null=True, blank=True)

class Bilhete(models.Model):
    jogo = models.ForeignKey(Jogo, on_delete=models.CASCADE)
    bancada = models.CharField(max_length=200, default='')
    stock = models.IntegerField(default=0)
    preco = models.IntegerField(default=0)


