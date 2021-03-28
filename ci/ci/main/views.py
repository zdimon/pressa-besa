from django.shortcuts import render
from .forms import EnvForm
from django.shortcuts import redirect


def index(request):
    if request.method == 'POST':
        form = EnvForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/done')
    else:
        form = EnvForm()
    return render(request, 'index.html', {"form": form})


def done(request):
    return render(request, 'done.html')


def info(request):
    return render(request, 'info.html')
