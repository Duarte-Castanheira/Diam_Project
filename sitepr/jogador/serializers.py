from rest_framework import serializers
from .models import Estatistica, Jogador


class EstatisticasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estatistica
        fields = ('pk', 'golos', 'assistencias')

class JogadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jogador
        fields = ('pk', 'nome', 'numero', 'data_nascimento', 'imagem', 'stats')