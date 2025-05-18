from rest_framework import serializers
from .models import Questao, Opcao, Inquerito, Pergunta

class QuestaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questao
        fields = ('pk', 'questao_texto', 'pub_data')

class OpcaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Opcao
        fields = ('pk', 'questao', 'opcao_texto', 'votos')

class PerguntaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pergunta
        fields = ['id', 'texto_pergunta']

class InqueritoSerializer(serializers.ModelSerializer):
    perguntas = PerguntaSerializer(many=True, read_only=True)

    class Meta:
        model = Inquerito
        fields = ['id', 'titulo', 'descricao', 'perguntas', 'criado_em']

