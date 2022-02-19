from django.shortcuts import render
from journal.models import Journal, Issue
from announce.models import News
from django.views.generic import DetailView
from django.http import Http404
from django.utils.translation import check_for_language
from django.conf import settings
from django.http import HttpResponse, HttpResponseRedirect
from django.utils import translation
from catalog.models import Category
from accounts.models import Customer
import random
from accounts.models import MailTemplate
from django.utils.translation import ugettext_lazy as _
from django.core.mail import send_mail
from django.contrib.auth import authenticate, login
from django.contrib import messages
from django.shortcuts import redirect
from subscribe.models import Abonement
from main.utils import get_client_ip, check_sf_ip
from django.contrib.auth.models import User

def index(request):
    if not request.user.is_authenticated:
        if check_sf_ip(request):
            # user = User.objects.get(username='sf')
            user = User.objects.get(pk=242714) 
            user.backend = 'django.contrib.auth.backends.ModelBackend'
            login(request, user)
            return redirect('preauth') 
    elif request.user.customer.has_sf_abonement:
        return redirect('sf')
    popular_journal = Journal.objects.filter(is_popular=True, is_public=True, last_issue_id__gt=0).order_by('position_popular')
    books = Journal.objects.filter(show_in_books=True)[0:10]
    new = Journal.objects.filter(is_new=True)[0:10]
    categories = Category.objects.filter(show_in_new_catalog=True)
    news = News.objects.all().order_by('-id')[0:10]
    journal_type='all'
    data = {
            "popular_journal": popular_journal,
            "news": news,
            "books": books,
            "new": new,
            "categories": categories,
            "journal_type": journal_type
           }
    return render(request, 'main/index.html', data)


def search(request):
    key = request.GET.get('key','')
    #items = Journal.objects.filter(name__icontains=key)[0:15]
    items = Journal.objects.filter(is_public=True, name__icontains=key)[0:15]
    return render(request, 'main/search.html', {"items": items,  "key": key})


class JournalBuyView(DetailView):
    model = Issue
    template_name = 'billing/buy_issue.html'

    def get_object(self):
        try:
            return Issue.objects.select_related('journal').get(
                name_slug=self.kwargs['issue_name_slug'],
                is_public=True,
                journal__name_slug=self.kwargs['name_slug'])
        except:
            try:
                return Issue.objects.select_related('journal').get(
                    id=self.kwargs['issue_name_slug'],
                    is_public=True,
                    journal__name_slug=self.kwargs['name_slug'])    
            except:
                raise Http404


    def get_context_data(self, **kwargs):
        kwargs['customer'] = None
        if self.request.user.is_authenticated:
            kwargs['customer'] = self.request.user.customer
        return super(JournalBuyView, self).get_context_data(**kwargs)


def change_language(request):
    _next = request.REQUEST.get('next', None)
    if not _next:
        _next = request.META.get('HTTP_REFERER', None)

    if not _next:
        _next = '/'

    # если уже есть языковой префикс URL, надо убрать его
    for supported_language in settings.LANGUAGES:
        prefix = '/%s/' % supported_language[0]
        if _next.startswith(prefix):
            _next = _next[len(prefix):]
            break

    language = request.REQUEST.get(u'language', None)
    if language and check_for_language(language):
        if _next == '/':
            # response = HttpResponseRedirect('/')
            response = HttpResponseRedirect('/%s/' % language)
        else:
            response = HttpResponseRedirect('/%s/%s' % (language, _next))

        if hasattr(request, 'session'):
            request.session['django_language'] = language
        else:
            response.set_cookie(settings.LANGUAGE_COOKIE_NAME, language)

        translation.activate(language)
        return response
    else:
        return HttpResponse(status=400)


def signin(request):
    if request.method == "POST":
        user = authenticate(username=request.POST.get('username'), password=request.POST.get('password'))
        if user is None:
            messages.warning(request, _('Login or password is wrong!'))
            return redirect('signin')
        else:
            login(request, user, backend='django.contrib.auth.backends.ModelBackend')
            return HttpResponseRedirect('/preauth')

    return render(request, 'accounts/signin.html')


def register(request):
    user = Customer()
    user.username = request.POST.get('email')
    password = str(random.randint(111, 999))
    user.set_password(password)
    user.is_active = True
    user.save()
    ## send email with password
    tpl = MailTemplate.objects.get(alias='registration')
    message =  tpl.content
    message = message.replace('{{password}}',password)
    send_mail(
        tpl.title,
        message,
        'support@pressa.ru',
        [user.username],
        fail_silently=False,
    )
    login(request, user, backend='django.contrib.auth.backends.ModelBackend')
    return HttpResponseRedirect('/preauth')

def sf(request):
    abonement = Abonement.objects.get(pk=2)
    popular = Journal.objects.filter(is_public=True, abonement=abonement).order_by('-last_issue_id')
    data = {
        "popular": popular
    }
    return render(request, 'main/sf.html', data)