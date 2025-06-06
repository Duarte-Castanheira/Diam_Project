from rest_framework import serializers
from .models import Jogo, Convocatoria, Bilhete, Adversario
from jogador.serializers import JogadorSerializer

class ConvocatoriaSerializer(serializers.ModelSerializer):
    jogadores = JogadorSerializer(many=True)

    class Meta:
        model = Convocatoria
        fields = ('pk', 'jogadores')

class AdversarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Adversario
        fields = ('pk', 'nome', 'imagem')

class JogoSerializer(serializers.ModelSerializer):
    adversario = AdversarioSerializer()

    class Meta:
        model = Jogo
        fields = ('pk', 'data', 'hora', 'adversario', 'resultado',
                  'local', 'bilhetes_vendidos', 'bilhetes_maximos', 'imagem', 'convocatoria')

class BilheteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bilhete
        fields = ('pk', 'jogo', 'preco', 'bancada', 'stock')