from rest_framework import serializers
from .models import ProdutoLoja, Noticia

class ProdutoLojaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProdutoLoja
        fields = ('pk', 'nome', 'descricao', 'preco', 'stock', 'imagem')

class NoticiaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Noticia
        fields = ('pk', 'titulo', 'data', 'noticia_texto', 'imagem')