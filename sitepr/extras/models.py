from django.db import models
#from jogos.models import Jogo

class ProdutoLoja(models.Model):
    nome = models.CharField(max_length=200)
    descricao = models.TextField()
    preco = models.IntegerField(default=0)
    stock = models.IntegerField(default=0)
    imagem = models.ImageField(upload_to='Produtos/', null=True)

class Noticia(models.Model):
    Titulo = models.CharField(max_length=200)
    data = models.DateField()
    noticia_texto = models.TextField()



#class calendario(models.Model):
#    jogo = models.ForeignKey(Jogo, on_delete=models.CASCADE)
#    data = models.DateField()
#    hora = models.TimeField()