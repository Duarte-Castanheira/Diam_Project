from django.db import models


class Estatistica(models.Model):
    golos = models.IntegerField(default=0)
    assistencias = models.IntegerField(default=0)
    numero_jogos = models.IntegerField(default=0)
    cartoes_amarelos = models.IntegerField(default=0)
    cartoes_vermelhos = models.IntegerField(default=0)


class Jogador(models.Model):
    nome = models.CharField(max_length=200)
    numero = models.IntegerField(default=0)
    posicao = models.CharField(max_length=200, default=' ')
    data_nascimento =  models.DateField()
    imagem = models.ImageField(upload_to='Jogadores/', null=True, blank=True)
    nacionalidade = models.ImageField(upload_to='Bandeiras/', null=True, blank=True)
    stats = models.OneToOneField(Estatistica, on_delete=models.CASCADE)
    valor_mercado = models.IntegerField(default=0)

