from django.urls import path
from . import views

app_name = 'jogador'
urlpatterns = [
    path('api/jogadores/', views.jogadores_list),
    path('api/jogador/<int:jogador_id>/', views.jogador_detail),
    path('api/jogadores/estatisticas/', views.estatistica_list),
    path('api/jogador/<int:jogador_id>/estatisticas/', views.estatistica_detail),

]