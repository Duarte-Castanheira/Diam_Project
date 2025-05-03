from django.urls import path
from . import views

app_name = 'jogos'
urlpatterns = [
    path('api/jogos/', views.jogos_list),
    path('api/jogo/<int:jogo_id>/', views.jogo_detail),
    path('api/convocatorias/', views.convocatoria_list),
    path('api/convocatoria/<int:convocatoria_id>/', views.convocatoria_detail),

]