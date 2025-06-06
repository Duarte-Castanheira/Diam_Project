from django.contrib import admin
from .models import Questao, Opcao, Formulario

class OpcaoInline(admin.TabularInline):
    model = Opcao
    extra = 1

class QuestaoAdmin(admin.ModelAdmin):
    list_display = ('pk', 'questao_texto', 'pub_data', 'tipo')
    search_fields = ('pk', 'questao_texto', 'pub_data')
    list_filter = ('tipo', 'questao_texto', 'pub_data')
    inlines = [OpcaoInline]

class QuestaoInline(admin.TabularInline):
    model = Questao
    extra = 1

class FormularioAdmin(admin.ModelAdmin):
    list_display = ('pk', 'nome')
    inlines = [QuestaoInline]

@admin.register(Questao)
class RegisteredQuestaoAdmin(QuestaoAdmin):
    pass

@admin.register(Opcao)
class RegisteredOpcaoAdmin(admin.ModelAdmin):
    list_display = ('pk', 'questao', 'opcao_texto', 'votos')
    search_fields = ('opcao_texto',)
    list_filter = ('questao',)

@admin.register(Formulario)
class RegisteredFormularioAdmin(FormularioAdmin):
    pass
