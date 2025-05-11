from django.contrib.auth.models import User
from django.db import models
from django.contrib.auth.models import AbstractUser

#class Profile(models.Model):
 #user = models.OneToOneField(User, on_delete=models.CASCADE)



class CustomUser(AbstractUser):
    nascimento = models.DateField(null=True, blank=True)
    telemovel = models.CharField(max_length=15, null=True, blank=True)