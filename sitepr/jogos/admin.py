from django.contrib import admin
from .models import Jogo, Convocatoria, Bilhete

@admin.register(Jogo)
class JogoAdmin(admin.ModelAdmin):
    list_display = ('pk', 'data', 'hora', 'adversario', 'resultado', 'local', 'bilhetes_vendidos', 'bilhetes_maximos')
    search_fields = ('adversario', 'local')
    list_filter = ('data', 'local')
    ordering = ('-data', 'hora')

@admin.register(Convocatoria)
class ConvocatoriaAdmin(admin.ModelAdmin):
    list_display = ('pk', 'jogo_display')
    filter_horizontal = ('jogadores',)

    def jogo_display(self, obj):
        return f"Jogo #{obj.jogo.pk} - {obj.jogo.adversario}"
    jogo_display.short_description = 'Jogo'

@admin.register(Bilhete)
class BilheteAdmin(admin.ModelAdmin):
    list_display = ('pk', 'jogo', 'preco', 'setor', 'fila', 'lugar', 'numero')
    search_fields = ('setor',)
    list_filter = ('setor', 'preco')
    ordering = ('jogo', 'setor', 'fila', 'lugar')
    fields = ('jogo', 'preco', 'setor', 'fila', 'lugar', 'numero')