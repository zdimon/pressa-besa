from django.shortcuts import render
from django.shortcuts import redirect
from .forms import ProfileForm


def profile(request):
    if not request.user.is_authenticated:
        return redirect('/')
    if request.method == 'POST':
        form = ProfileForm(request.POST, instance=request.user)
        if form.is_valid():
            obj = form.save()
    else:
        form = ProfileForm(instance=request.user)
    return render(request, 'profile.html', {"form": form})
