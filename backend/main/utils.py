
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.shortcuts import redirect


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def check_sf_ip(request):
    ip = get_client_ip(request)
    if ip in ['172.68.10.146','193.151.241.65', '95.173.132.1', '213.141.157.50', '193.151.241.32', '62.213.118.138', '134.249.158.138', '178.133.22.101']:
        return True
    else:
        return False