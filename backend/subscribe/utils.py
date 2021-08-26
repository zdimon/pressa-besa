from subscribe.models import UserAbonement
import datetime


def add_abonement(abon, user, days):
    print(f'Add abonement {days}')
    try:
        ca = UserAbonement.objects.filter(user=user).order_by('-stop_date')[0]
        start_date = ca.stop_date
        end_date = start_date + datetime.timedelta(days=days)
        a = UserAbonement()
        a.start_date = ca.stop_date
        a.stop_date = ca.stop_date + datetime.timedelta(days=days)   
    except Exception as e:
        print(e)
        start_date = datetime.datetime.now()
        end_date = start_date + datetime.timedelta(days=days)
        a = UserAbonement()
        a.start_date = start_date
        a.stop_date = end_date
    a.abonement = abon
    a.user = user.customer
    a.real_cost = 8*int(days)
    a.save()