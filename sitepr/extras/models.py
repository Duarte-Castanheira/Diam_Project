from django.db import models

class ProdutoLoja(models.Model):
    nome = models.CharField(max_length=200)
    descricao = models.TextField()
    preco = models.IntegerField(default=0)
    stock = models.IntegerField(default=0)
    imagem = models.ImageField(upload_to='Produtos/', default='Produtos/logo.png')

    def __str__(self):
        return self.nome

class Noticia(models.Model):
    titulo = models.CharField(max_length=200)
    data = models.DateField()
    noticia_texto = models.TextField()
    imagem = models.ImageField(upload_to='Noticias/', default='Noticias/logo.png')
