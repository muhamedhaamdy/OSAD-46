from django.shortcuts import HttpResponse, render, redirect
from .models import Student

# Create your views here.
def home(request):
    return render(request, 'index.html')

def student(request):
    if (request.method == "GET"):
        students = Student.objects.all()
        return render(request, 'students.html', {'students':students} )
    elif (request.method == "POST"):
        name = request.POST.get('name')
        email = request.POST.get('email')
        age = request.POST.get('age')
        img = request.POST.get('img')
        Student.objects.create(name=name, age=age, email=email, img=img)
        students = Student.objects.all()
        return render(request, 'students.html', {'students':students})

def delete_student(request, id):
    student = Student.objects.get(id =id)
    if student:
        student.delete()
        return redirect('/student/')
    else:
        HttpResponse("student Id not found")