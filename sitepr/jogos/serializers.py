from rest_framework import serializers
from .models import Jogo, Convocatoria, Bilhete
from jogador.serializers import JogadorSerializer

class JogoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jogo
        fields = ('pk', 'data', 'hora', 'adversario', 'resultado',
                  'local', 'bilhetes_vendidos', 'bilhetes_maximos')

class ConvocatoriaSerializer(serializers.ModelSerializer):
    jogadores = JogadorSerializer(many=True)

    class Meta:
        model = Convocatoria
        fields = ('pk', 'jogo', 'jogadores')

class BilheteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bilhete
        fields = ('pk', 'jogo', 'preco', 'setor', 'fila', 'lugar', 'numero')