from django.urls import path
from .views import student, delete_student

urlpatterns = [
    path('', student),
    path('delete/<int:id>/', delete_student, name='delete_student'),
]