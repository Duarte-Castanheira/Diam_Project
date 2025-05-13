from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework import status
from .serializers import *
from .models import *
from extras.models import ProdutoLoja

@ensure_csrf_cookie
@api_view(['POST',])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')
    telemovel = request.data.get('telemovel')
    nascimento = request.data.get('nascimento')
    carrinho = request.data.get('carrinho')

    if username is None or password is None:
        return Response({'error': 'invalid username/password'}, status=status.HTTP_400_BAD_REQUEST)
    if CustomUser.objects.filter(username=username).exists():
        return Response({'error': 'Username já existe.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = CustomUser.objects.create_user(
            username=username,
            password=password,
            email=email,
            telemovel=telemovel,
            nascimento=nascimento,
        )
        login(request, user)
        return Response({'message': f'Utilizador {user.username} criado com sucesso!'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user) # Criação da sessão
        return Response({'message': 'Logged in successfully'})
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def logout_view(request):
    logout(request)
    request.session.flush()
    response = Response({'message': 'Logged out successfully'})
    response.delete_cookie('sessionid')  # força a remoção do cookie
    return response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
    return Response({'username': request.user.username, 'email': request.user.email, 'telemovel': request.user.telemovel, 'nascimento': request.user.nascimento,})

