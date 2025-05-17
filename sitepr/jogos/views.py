from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *
from .models import *


@api_view(['GET', 'POST'])
def jogos_list(request):
    if request.method == 'GET':
        jogos = Jogo.objects.all()
        serializer = JogoSerializer(jogos, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = JogoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def jogo_detail(request, pk):
    try:
        jogo = Jogo.objects.get(pk=pk)
    except Jogo.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = JogoSerializer(jogo)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = JogoSerializer(jogo, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        jogo.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def convocatoria_list(request):
    if request.method == 'GET':
        convocatorias = Convocatoria.objects.all()
        serializer = ConvocatoriaSerializer(convocatorias, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ConvocatoriaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def convocatoria_detail(request, convocatoria_id):
    try:
        convocatoria = Convocatoria.objects.get(pk=convocatoria_id)
    except Convocatoria.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ConvocatoriaSerializer(convocatoria)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = ConvocatoriaSerializer(convocatoria, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        convocatoria.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def bilhete_list(request):
    if request.method == 'GET':
        bilhetes = Bilhete.objects.all()
        serializer = BilheteSerializer(bilhetes, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = BilheteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def bilhete_detail(request, pk):
    try:
        bilhete = Bilhete.objects.get(pk=pk)
    except Bilhete.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = BilheteSerializer(bilhete)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = BilheteSerializer(bilhete, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        bilhete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def bilhetes_por_jogo(request, bilhete_id):
    bilhetes = Bilhete.objects.filter(jogo_id=bilhete_id)
    serializer = BilheteSerializer(bilhetes, many=True)
    return Response(serializer.data)