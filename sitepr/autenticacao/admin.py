from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser
from django.utils.translation import gettext_lazy as _

class CustomUserAdmin(UserAdmin):
    model = CustomUser
    fieldsets = UserAdmin.fieldsets + (
        (_('Informações extra'), {
            'fields': ('nascimento', 'telemovel','carrinho','carrinho_bilhete'),
        }),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        (_('Informações extra'), {
            'fields': ('nascimento', 'telemovel'),
        }),
    )
    filter_horizontal = ('carrinho','carrinho_bilhete',)
admin.site.register(CustomUser, CustomUserAdmin)