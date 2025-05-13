from django.contrib.auth.models import User
from django.db import models
from django.contrib.auth.models import AbstractUser
from extras.models import ProdutoLoja


class CustomUser(AbstractUser):
    nascimento = models.DateField(null=True, blank=True)
    telemovel = models.CharField(max_length=15, null=True, blank=True)
    carrinho = models.ManyToManyField(ProdutoLoja, blank=True)
