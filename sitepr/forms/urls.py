from django.urls import path
from . import views

app_name = 'forms'
urlpatterns = [
    path('api/formulario/', views.formulario_list),

]