from django.urls import path
from . import views

app_name = 'jogos'
urlpatterns = [
    path('api/jogos/', views.jogos_list),
    path('api/jogo/<int:jogo_id>/', views.jogo_detail),
    path('api/convocatorias/', views.convocatoria_list),
    path('api/convocatoria/<int:convocatoria_id>/', views.convocatoria_detail),
    path('api/bilhetes/', views.bilhetes_list),
    path('api/jogo/<int:jogo_id>/bilhetes/', views.bilhetes_por_jogo),
    path('api/jogos/proximos/', views.proximos_jogos),
    path('api/jogos/ultimos/', views.ultimos_jogos),
]