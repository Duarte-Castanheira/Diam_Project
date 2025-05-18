from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import *  # (1)
from .serializers import InqueritoSerializer


from django.shortcuts import render, get_object_or_404, redirect
from .models import Inquerito, Resposta


@api_view(['GET', 'POST']) # (2)
def questions(request):

    if request.method == 'GET': # (3)
        question_list = Questao.objects.all()
        serializer = QuestaoSerializer(question_list, many=True)
        return Response(serializer.data)

    elif request.method == 'POST': # (3)
        serializer = QuestaoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)

    return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE']) # (2) e (4)
def question_detail(request, question_id):

    try:
        question = Questao.objects.get(pk=question_id)
    except Questao.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = QuestaoSerializer(question)
        return Response(serializer.data)

    if request.method == 'PUT': # (4)
        serializer = QuestaoSerializer(question, data=request.data)
        if serializer.is_valid():
            serializer.save()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST'])
def options(request, question_id):
    if request.method == 'GET':
        question = Questao.objects.get(pk=question_id)
        option_list = question.opcao_set.all()
        serializer = OpcaoSerializer(option_list, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = OpcaoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def option_detail(request, option_id):
    try:
        option = Opcao.objects.get(pk=option_id)
    except Opcao.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = OpcaoSerializer(option)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = OpcaoSerializer(option, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        option.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def InqueritoList(request):
    inqueritos = Inquerito.objects.all()
    serializer = InqueritoSerializer(inqueritos, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def InqueritoDetail(request, pk):
    inquerito = get_object_or_404(Inquerito, pk=pk)
    serializer = InqueritoSerializer(inquerito)
    return Response(serializer.data)

@api_view(['POST'])
def InqueritoCreate(request):
    serializer = InqueritoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



def listar_inqueritos(request):
    inqueritos = Inquerito.objects.all()
    return render(request, 'inqueritos/listar_inqueritos.html', {'inqueritos': inqueritos})



@api_view(['GET'])
def responder_inquerito(request, id_inquerito):
    try:
        inquerito = Inquerito.objects.get(id=id_inquerito)
    except Inquerito.DoesNotExist:
        return Response({"erro": "Inquérito não encontrado"}, status=404)

    perguntas = inquerito.perguntas.all()
    data = {
        "id": inquerito.id,
        "titulo": inquerito.titulo,
        "descricao": inquerito.descricao,
        "perguntas": [{"id": p.id, "texto_pergunta": p.texto_pergunta} for p in perguntas]
    }
    return Response(data)



@api_view(['POST'])
def guardarResposta(request):
    pergunta_id = request.data.get("pergunta")
    resposta_texto = request.data.get("resposta_texto")
    resposta = Resposta.objects.create(
        pergunta_id=pergunta_id,
        resposta_texto=resposta_texto
    )
    return Response({"status": "resposta guardada", "id": resposta.id})