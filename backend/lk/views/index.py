from django.shortcuts import render
from django.shortcuts import redirect
from bookmarks.models import Bookmarks
from billing.models import Transaction
from subscribe.models import UserAbonement, UserSubscrition
from journal.models import PurchasedIssues

def index(request):
    try:
        user =  request.user.customer
    except: 
        return redirect('logout')

    return render(request, 'lk/pages/index.html')