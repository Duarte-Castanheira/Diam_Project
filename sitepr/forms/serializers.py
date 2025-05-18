from rest_framework import serializers
from .models import Questao, Opcao, Inquerito

class QuestaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Questao
        fields = ('pk', 'questao_texto', 'pub_data')

class OpcaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Opcao
        fields = ('pk', 'questao', 'opcao_texto', 'votos')

class InqueritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquerito
        fields = ['id', 'titulo', 'descricao', 'criado_em']
