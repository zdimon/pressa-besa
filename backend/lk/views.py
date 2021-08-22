from django.shortcuts import render
from django.shortcuts import redirect
from bookmarks.models import Bookmarks

def lk(request):
    try:
        user =  request.user.customer
    except: 
        return redirect('logout')

    bookmarks = Bookmarks.objects.filter(owner=request.user)
    cnt = {"user": user, "bookmarks": bookmarks}
    return render(request, 'lk/index.html', cnt)


def replanish(request):
    cnt = {"user": request.user.customer}
    return render(request, 'lk/replanish.html', cnt)
