from django.contrib import admin
from .models import Questao, Opcao, Inquerito, Pergunta, Resposta

@admin.register(Questao)
class QuestaoAdmin(admin.ModelAdmin):
    list_display = ('pk','questao_texto','pub_data')
    search_fields = ('pk','questao_texto','pub_data')
    list_filter = ('questao_texto', 'pub_data')

    fieldsets = (
        ('Informações principais', {
            'fields': ('questao_texto','pub_data')
        }),
    )

@admin.register(Opcao)
class OpcaoAdmin(admin.ModelAdmin):
    list_display = ('id', 'questao', 'opcao_texto', 'votos')
    search_fields = ('id', 'questao', 'opcao_texto', 'votos')
    list_filter = ('id', 'questao', 'opcao_texto', 'votos')
    fieldsets = (
        ('Dados da Estatística', {
            'fields': ('questao', 'opcao_texto', 'votos')
        }),
    )

@admin.register(Inquerito)
class InqueritoAdmin(admin.ModelAdmin):
    list_display = ['titulo', 'descricao']




@admin.register(Pergunta)
class PerguntaAdmin(admin.ModelAdmin):
    list_display = ['texto_pergunta', 'inquerito']


@admin.register(Resposta)
class RespostaAdmin(admin.ModelAdmin):
    list_display = ['resposta_texto', 'pergunta', 'respondido_em']
