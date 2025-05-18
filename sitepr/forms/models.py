
from django.db import models
from django.utils import timezone

class Questao(models.Model):
    questao_texto = models.CharField(max_length=200)
    pub_data = models.DateTimeField('data de publicacao')

    def __str__(self):
        return self.questao_texto

class Opcao(models.Model):
    questao = models.ForeignKey(Questao,on_delete=models.CASCADE)
    opcao_texto = models.CharField(max_length=200)
    votos = models.IntegerField(default=0)

    def __str__(self):
        return self.opcao_texto



class Inquerito(models.Model):
    titulo = models.CharField(max_length=200)
    descricao = models.TextField(blank=True)
    criado_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.titulo


class Pergunta(models.Model):
    inquerito = models.ForeignKey(Inquerito, on_delete=models.CASCADE, related_name='perguntas')
    texto_pergunta = models.CharField(max_length=300)

    def __str__(self):
        return self.texto_pergunta


class Resposta(models.Model):
    pergunta = models.ForeignKey(Pergunta, on_delete=models.CASCADE, related_name='respostas')
    resposta_texto = models.TextField(blank=True, null=True)
    respondido_em = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Resposta para: {self.pergunta.texto_pergunta}"
