from django.shortcuts import render
from django.shortcuts import redirect
from bookmarks.models import Bookmarks
from billing.models import Transaction
from subscribe.models import UserAbonement, UserSubscrition
from journal.models import PurchasedIssues

def payments(request):
    try:
        user =  request.user.customer
    except: 
        return redirect('logout')
    transactions = Transaction.objects.filter(owner=request.user).order_by('-id')[0:20]
    return render(request, 'lk/pages/payments.html', {"transactions": transactions})