from django.db import models

TIPO_RESPOSTA = (
    ('FECHADA', 'Fechada (escolha de opções)'),
    ('ABERTA', 'Aberta (resposta livre)'),
)

class Formulario(models.Model):
    nome = models.CharField(max_length=200, blank=True, null=True)
class Questao(models.Model):
    formulario = models.ForeignKey(Formulario, related_name='questoes', on_delete=models.CASCADE, null=True, blank=True)
    questao_texto = models.CharField(max_length=200)
    pub_data = models.DateTimeField('data de publicação')
    tipo = models.CharField(max_length=10, choices=TIPO_RESPOSTA, default='FECHADA')

    def __str__(self):
        return self.questao_texto



class Opcao(models.Model):
    questao = models.ForeignKey(Questao, related_name='opcoes', on_delete=models.CASCADE)
    opcao_texto = models.CharField(max_length=200)
    votos = models.IntegerField(default=0)
    def __str__(self):
        return self.opcao_texto
