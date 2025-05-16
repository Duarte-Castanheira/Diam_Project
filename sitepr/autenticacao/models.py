from django.contrib.auth.models import User
from django.db import models
from django.contrib.auth.models import AbstractUser
from extras.models import ProdutoLoja
from jogos.models import Bilhete

class CustomUser(AbstractUser):
    nascimento = models.DateField(null=True, blank=True)
    telemovel = models.CharField(max_length=15, null=True, blank=True)
    carrinho = models.ManyToManyField(ProdutoLoja, blank=True)
    carrinho_bilhete = models.ManyToManyField(Bilhete, blank=True)