from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework import status
from .serializers import *
from .models import *
from extras.models import ProdutoLoja
from jogos.models import Bilhete

from extras.serializers import ProdutoLojaSerializer


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

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def user_view(request):
    user = request.user
    carrinho_serializado = ProdutoLojaSerializer(user.carrinho.all(), many=True)
    if request.method == 'GET':
        return Response({'username': user.username, 'email': user.email, 'first_name': user.first_name,
            'last_name': user.last_name, 'telemovel': user.telemovel, 'nascimento': user.nascimento,'carrinho': carrinho_serializado.data})

    elif request.method == 'PUT':
        data = request.data
        user.username = data.get('username', user.username)
        user.first_name = data.get('first_name', user.first_name)
        user.last_name = data.get('last_name', user.last_name)
        user.email = data.get('email', user.email)
        user.telemovel = data.get('telemovel', user.telemovel)
        user.nascimento = data.get('nascimento', user.nascimento)
        user.password = data.get('password', user.password)
        user.save()

        return Response({'message': 'Dados atualizados com sucesso!'})

@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_carrinho(request):
    user = request.user
    if request.method == 'GET':
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'POST':

        produtos_ids = request.data.get('carrinho', [])

        if not isinstance(produtos_ids, list):
            return Response({'error': 'O campo "carrinho" deve ser uma lista de IDs de produtos.'}, status=400)

        user.carrinho.clear()  # <- limpa tudo

        produtos = ProdutoLoja.objects.filter(id__in=produtos_ids)

        for produto in produtos:
            if produto.stock > 0:
                produto.stock -= 1  # reduz o stock
                produto.save()
                user.carrinho.add(produto)
            else:
                return Response({'error': f'Stock insuficiente para o produto {produto.nome}.'}, status=400)

        user.save()

        return Response({'success': 'Carrinho atualizado com sucesso.'})

    elif request.method == 'DELETE':

        produto_id = request.data.get('produto_id')

        if not produto_id:
            return Response({'error': 'Falta o produto_id no pedido.'}, status=400)

        try:
            produto = ProdutoLoja.objects.get(id=produto_id)
        except ProdutoLoja.DoesNotExist:
            return Response({'error': 'Produto não encontrado.'}, status=404)

        user.carrinho.remove(produto)
        produto.stock += 1
        produto.save()
        user.save()

        return Response({'success': 'Produto removido do carrinho e stock atualizado com sucesso.'})


@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def update_carrinho_bilhete(request):
    user = request.user

    if request.method == 'GET':
        serializer = CustomUserSerializer(user)
        return Response(serializer.data)

    elif request.method == 'POST':
        bilhetes_ids = request.data.get('carrinho_bilhete', [])

        if not isinstance(bilhetes_ids, list):
            return Response({'error': 'O campo "carrinho_bilhete" deve ser uma lista de IDs de bilhetes.'}, status=400)

        user.carrinho_bilhete.clear()

        bilhetes = Bilhete.objects.filter(id__in=bilhetes_ids)

        for bilhete in bilhetes:
            if bilhete.stock > 0:
                bilhete.stock -= 1  # Reduz o stock
                bilhete.save()
                user.carrinho_bilhete.add(bilhete)  # Adiciona o bilhete ao carrinho
            else:
                return Response({'error': f'Stock insuficiente para o bilhete com ID {bilhete.id}.'}, status=400)

        user.save()
        return Response({'success': 'Carrinho de bilhetes atualizado com sucesso.'})

    elif request.method == 'DELETE':
        bilhete_id = request.data.get('bilhete')

        if not bilhete_id:
            return Response({'error': 'Falta o parâmetro "bilhete" no pedido.'}, status=400)

        try:
            bilhete = Bilhete.objects.get(id=bilhete_id)
        except Bilhete.DoesNotExist:
            return Response({'error': 'Bilhete não encontrado.'}, status=404)

        if bilhete in user.carrinho_bilhete.all():
            user.carrinho_bilhete.remove(bilhete)
            bilhete.stock += 1
            bilhete.save()
            user.save()
            return Response({'success': 'Bilhete removido do carrinho e stock atualizado com sucesso.'})
        else:
            return Response({'error': 'Bilhete não está no carrinho.'}, status=400)