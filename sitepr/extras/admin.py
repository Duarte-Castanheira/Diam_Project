from django.contrib import admin
from django.utils.html import format_html
from .models import ProdutoLoja, Noticia

@admin.register(ProdutoLoja)
class ProdutoLojaAdmin(admin.ModelAdmin):
    list_display = ('nome', 'preco', 'stock', 'imagem_preview')
    search_fields = ('nome', 'descricao')
    list_filter = ('preco', 'stock')
    readonly_fields = ('imagem_preview',)

    fieldsets = (
        ('Informações do Produto', {
            'fields': ('nome', 'descricao', 'preco', 'stock')
        }),
        ('Imagem', {
            'fields': ('imagem', 'imagem_preview')
        }),
    )

    def imagem_preview(self, obj):
        if obj.imagem:
            return format_html('<img src="{}" style="max-height: 200px;" />', obj.imagem.url)
        return "Sem imagem"
    imagem_preview.short_description = "Pré-visualização"


@admin.register(Noticia)
class NoticiaAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'data', 'imagem_preview')
    search_fields = ('titulo','data', 'noticia_texto')
    list_filter = ('titulo','data')

    readonly_fields = ('imagem_preview',)

    fieldsets = (
        ('Conteúdo da Notícia', {
            'fields': ('titulo', 'data', 'noticia_texto', 'imagem', 'imagem_preview')
        }),
    )

    def imagem_preview(self, obj):
        if obj.imagem:
            return format_html('<img src="{}" style="max-height: 200px;" />', obj.imagem.url)
        return "Sem imagem"
    imagem_preview.short_description = "Pré-visualização"