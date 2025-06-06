from rest_framework import serializers
from .models import Questao, Opcao, Formulario

class OpcaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Opcao
        fields = ('pk', 'opcao_texto', 'votos')

class QuestaoSerializer(serializers.ModelSerializer):
    opcoes = OpcaoSerializer(many=True, read_only=True)

    class Meta:
        model = Questao
        fields = ('pk', 'questao_texto', 'pub_data', 'tipo', 'opcoes')

class FormularioSerializer(serializers.ModelSerializer):
    questoes = QuestaoSerializer(many=True, read_only=True)

    class Meta:
        model = Formulario
        fields = ('pk', 'nome', 'questoes')
