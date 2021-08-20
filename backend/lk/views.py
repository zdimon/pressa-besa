from django.shortcuts import render
from django.shortcuts import redirect

def lk(request):
    try:
        user =  request.user.customer
    except: 
        return redirect('logout')
    cnt = {"user": user}
    return render(request, 'lk/index.html', cnt)


def replanish(request):
    cnt = {"user": request.user.customer}
    return render(request, 'lk/replanish.html', cnt)
