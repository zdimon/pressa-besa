from django.shortcuts import render
from django.shortcuts import redirect
from bookmarks.models import Bookmarks
from billing.models import Transaction
from subscribe.models import UserAbonement, UserSubscrition
from journal.models import PurchasedIssues

def collection(request):
    try:
        user = request.user.customer
    except: 
        return redirect('logout')
    collection = PurchasedIssues.objects.filter(customer=request.user.customer).order_by('-id')[0:20]
    return render(request, 'lk/pages/collection.html', {"collection": collection})