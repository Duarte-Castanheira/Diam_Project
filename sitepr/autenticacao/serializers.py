from rest_framework import serializers
from .models import CustomUser
from extras.serializers import ProdutoLojaSerializer

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    carrinho = ProdutoLojaSerializer(many=True, read_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'nascimento', 'telemovel', 'carrinho']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)  # encripta a password
        user.save()
        return user