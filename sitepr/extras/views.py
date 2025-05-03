from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import * # (1)

@api_view(['GET', 'POST'])
def produto_loja_list(request):
    if request.method == 'GET':
        produtos = ProdutoLoja.objects.all()
        serializer = ProdutoLojaSerializer(produtos, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ProdutoLojaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def produto_loja_detail(request, pk):
    try:
        produto = ProdutoLoja.objects.get(pk=pk)
    except ProdutoLoja.DoesNotExist:
        return Response({'error': 'Produto não encontrado'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = ProdutoLojaSerializer(produto)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = ProdutoLojaSerializer(produto, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        produto.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def noticia_list(request):
    if request.method == 'GET':
        noticias = Noticia.objects.all()
        serializer = NoticiaSerializer(noticias, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = NoticiaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def noticia_detail(request, pk):
    try:
        noticia = Noticia.objects.get(pk=pk)
    except Noticia.DoesNotExist:
        return Response({'error': 'Notícia não encontrada'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = NoticiaSerializer(noticia)
        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = NoticiaSerializer(noticia, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        noticia.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
