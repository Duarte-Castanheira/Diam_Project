from django.urls import path
from . import views

app_name = 'extras'
urlpatterns = [
    path('api/produtos/', views.produto_loja_list),
    path('api/produto/<int:produto_id>/', views.produto_loja_detail),
    path('api/noticias/', views.noticia_list),
    path('api/noticia/<int:noticia_id>/', views.noticia_detail),

]