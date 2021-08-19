from django.shortcuts import render

# Create your views here.

def reader_index(request):
    return render(request,'reader/index.html')