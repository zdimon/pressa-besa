from django.shortcuts import render

def index(request):
    return render(request,'layout.html',{"name": "Dima"})
