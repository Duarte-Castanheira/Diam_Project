from django.contrib import admin
from django.utils.html import format_html
from .models import Jogador, Estatistica


@admin.register(Jogador)
class JogadorAdmin(admin.ModelAdmin):
    list_display = ('nome', 'numero', 'data_nascimento', 'imagem_preview', 'nacionalidade_preview')
    search_fields = ('nome',)
    list_filter = ('data_nascimento',)
    readonly_fields = ('imagem_preview', 'nacionalidade_preview')

    fieldsets = (
        ('Informações principais', {
            'fields': ('nome', 'numero', 'data_nascimento', 'nacionalidade', 'nacionalidade_preview', 'valor_mercado')
        }),
        ('Imagem e estatísticas', {
            'fields': ('imagem', 'imagem_preview', 'stats')
        }),
    )

    def imagem_preview(self, obj):
        if obj.imagem:
            return format_html('<img src="{}" style="max-height: 200px;" />', obj.imagem.url)
        return "Sem imagem"
    imagem_preview.short_description = "Pré-visualização"

    def nacionalidade_preview(self, obj):
        if obj.nacionalidade:
            return format_html('<img src="{}" style="max-height: 50px;" />', obj.nacionalidade.url)
        return "Sem imagem"

    nacionalidade_preview.short_description = "Pré-visualização"

@admin.register(Estatistica)
class EstatisticaAdmin(admin.ModelAdmin):
    list_display = ('id', 'golos', 'assistencias','numero_jogos', 'cartoes_amarelos', 'cartoes_vermelhos')
    search_fields = ('id',)
    list_filter = ('golos', 'assistencias')

    fieldsets = (
        ('Dados da Estatística', {
            'fields': ('golos', 'assistencias','numero_jogos', 'cartoes_amarelos', 'cartoes_vermelhos')
        }),
    )