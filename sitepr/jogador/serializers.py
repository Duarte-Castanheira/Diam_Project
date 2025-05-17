from rest_framework import serializers
from .models import Estatistica, Jogador


class EstatisticasSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estatistica
        fields = ('pk', 'golos', 'assistencias', 'numero_jogos', 'cartoes_amarelos', 'cartoes_vermelhos')

class JogadorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jogador
        fields = ('pk', 'nome', 'numero','posicao', 'data_nascimento', 'imagem','nacionalidade','valor_mercado', 'stats')