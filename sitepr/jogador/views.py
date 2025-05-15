from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from .models import *


# CRUD Views for Jogador
@api_view(['GET', 'POST'])
def jogadores_list(request):
    if request.method == 'GET':
        jogadores = Jogador.objects.all()
        serializer = JogadorSerializer(jogadores, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = JogadorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def jogador_detail(request, jogador_id):
    try:
        jogador = Jogador.objects.get(pk=jogador_id)
    except Jogador.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = JogadorSerializer(jogador)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = JogadorSerializer(jogador, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        jogador.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# CRUD Views for Estatistica
@api_view(['GET', 'POST'])
def estatistica_list(request):
    if request.method == 'POST':
        serializer = EstatisticasSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def estatistica_detail(request, jogador_id):
    try:
        estatistica = Estatistica.objects.get(pk=jogador_id)
    except Estatistica.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EstatisticasSerializer(estatistica)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = EstatisticasSerializer(estatistica, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        estatistica.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

