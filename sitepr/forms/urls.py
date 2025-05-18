from django.urls import path
from . import views
from .views import InqueritoList

app_name = 'forms'
urlpatterns = [
    path('api/questions/', views.questions),
    path('api/question/<int:question_id>', views.question_detail),
    path('api/options/<int:question_id>', views.options),
    path('api/option/<int:option_id>', views.option_detail),
    path('inqueritos/', InqueritoList, name='inquerito-list'),
    path('<int:id_inquerito>/responder/', views.responder_inquerito, name='responder-inquerito'),

]