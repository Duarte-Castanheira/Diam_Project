from django.db import models


class Estatistica(models.Model):
    golos = models.IntegerField(default=0)
    assistencias = models.IntegerField(default=0)

class Jogador(models.Model):
    nome = models.CharField(max_length=200)
    numero = models.IntegerField(default=0)
    data_nascimento =  models.DateField()
    imagem = models.ImageField(upload_to='Jogadores/', null=True, blank=True)
    stats = models.OneToOneField(Estatistica, on_delete=models.CASCADE)

