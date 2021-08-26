from django.shortcuts import render
from django.shortcuts import redirect
from bookmarks.models import Bookmarks
from billing.models import Transaction
from subscribe.models import UserAbonement, UserSubscrition


def lk(request):
    try:
        user =  request.user.customer
    except: 
        return redirect('logout')

    bookmarks = Bookmarks.objects.filter(owner=request.user)
    abonements = UserAbonement.objects.filter(user=request.user.customer).order_by('-stop_date')
    transactions = Transaction.objects.filter(owner=request.user).order_by('-id')[0:10]
    cnt = {"user": user, "bookmarks": bookmarks, "transactions": transactions, "abonements": abonements}
    return render(request, 'lk/index.html', cnt)


def replanish(request):
    cnt = {"user": request.user.customer}
    return render(request, 'lk/replanish.html', cnt)
