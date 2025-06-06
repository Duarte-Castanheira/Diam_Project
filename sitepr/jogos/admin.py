from django.contrib import admin
from django.utils.html import format_html

from .models import Jogo, Convocatoria, Bilhete, Adversario

@admin.register(Jogo)
class JogoAdmin(admin.ModelAdmin):
    list_display = ('pk', 'data', 'hora', 'adversario', 'resultado', 'local', 'bilhetes_vendidos', 'bilhetes_maximos', 'imagem_preview', 'convocatoria')
    search_fields = ('adversario__nome', 'local')
    list_filter = ('data', 'local')
    ordering = ('-data', 'hora')

    def imagem_preview(self, obj):
        if obj.imagem:
            return format_html('<img src="{}" width="50" style="border-radius: 4px;" />', obj.imagem.url)
        return "Sem imagem"
    imagem_preview.short_description = 'Imagem'


@admin.register(Adversario)
class AdversarioAdmin(admin.ModelAdmin):
    list_display = ('pk', 'nome', 'imagem_preview')
    search_fields = ('nome',)

    def imagem_preview(self, obj):
        if obj.imagem:
            return format_html('<img src="{}" width="50" style="border-radius: 4px;" />', obj.imagem.url)
        return "Sem imagem"
    imagem_preview.short_description = 'Imagem'


@admin.register(Convocatoria)
class ConvocatoriaAdmin(admin.ModelAdmin):
    list_display = ('pk',)
    filter_horizontal = ('jogadores',)


@admin.register(Bilhete)
class BilheteAdmin(admin.ModelAdmin):
    list_display = ('pk', 'jogo', 'preco', 'bancada', 'stock')
    search_fields = ('bancada',)
    list_filter = ('bancada', 'preco','stock')
    ordering = ('jogo', 'bancada', 'preco')
    fields = ('jogo', 'preco', 'bancada','stock')