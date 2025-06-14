from django.urls import path
from . import views

urlpatterns = [

    path("api/signup/", views.signup),
    path("api/login/", views.login_view),
    path("api/logout/", views.logout_view),
    path("api/user/", views.user_view),
    path("api/user/carrinho", views.update_carrinho),
    path("api/user/carrinho/bilhete", views.update_carrinho_bilhete),


]