from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Formulario
from .serializers import FormularioSerializer

@api_view(['GET'])
def formulario_list(request):
    formulario = Formulario.objects.prefetch_related('questoes__opcoes').first()
    if not formulario:
        return Response({"erro": "Nenhum formulário encontrado"}, status=404)
    serializer = FormularioSerializer(formulario)
    return Response(serializer.data)
