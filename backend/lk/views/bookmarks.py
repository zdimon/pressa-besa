from django.shortcuts import render
from django.shortcuts import redirect
from bookmarks.models import Bookmarks
from billing.models import Transaction
from subscribe.models import UserAbonement, UserSubscrition
from journal.models import PurchasedIssues

def bookmarks(request):
    try:
        user =  request.user.customer
    except: 
        return redirect('logout')
    bookmarks = Bookmarks.objects.filter(owner=request.user)
    return render(request, 'lk/pages/bookmarks.html', {"bookmarks": bookmarks})