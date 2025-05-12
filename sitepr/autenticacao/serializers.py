from django.contrib.auth.models import User
from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email','carrinho', 'telemovel', 'data_nascimento','pub_data')

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

#class ProfileSerializer(serializers.ModelSerializer):
# class Meta:
#    model = Profile
#    fields = ('pk', 'user')

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'nascimento', 'telemovel']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)  # encripta a password
        user.save()
        return user