from django.shortcuts import render


def lk(request):
    cnt = {"user": request.user.customer}
    return render(request, 'lk/index.html', cnt)


def replanish(request):
    cnt = {"user": request.user.customer}
    return render(request, 'lk/replanish.html', cnt)
