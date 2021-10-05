from django.shortcuts import render
from django.shortcuts import redirect
from bookmarks.models import Bookmarks
from billing.models import Transaction
from subscribe.models import UserAbonement, UserSubscrition
from journal.models import PurchasedIssues

def abonement(request):
    try:
        user =  request.user.customer
    except: 
        return redirect('logout')
    abonements = UserAbonement.objects.filter(user=request.user.customer).order_by('-stop_date')
    return render(request, 'lk/pages/abonement.html', {"abonements": abonements})