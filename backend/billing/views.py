from django.shortcuts import render
from billing.models import Payment, Transaction
from accounts.models import Customer
from app.settings import MERCHANT_ID, PRIVATE_SECURITY_KEY, SUCCESS_URL, FAIL_URL
from hashlib import md5
from urllib.parse import quote, urlencode
from django.shortcuts import redirect

def pay(payment_num, amount, description, user, **kwargs):
    """
    Параметры:
    payment_num -- ID покупки в системе продавца (ID транзакции)
    amount -- сумма к оплате
    description -- выводимое на payonline описание товара
    user -- accounts.Customer -- текущий покупатель

    Возвращает:
    redirect -- на сайт payonline

    Отсылка формы запроса платежа, одновременно перенаправляет пользователя
    на сайт payonline

    ОТСЫЛАЕМЫЕ ПОЛЯ:
    MerchantId  -- ID продавца
    OrderId  -- ID покупки (транзакции)
    Amount  -- Сумма
    Currency  -- Валюта - RUB
    OrderDescription  -- Описание товара
    SecurityKey  -- Открытый ключ, для контроля целостности параметров запроса
    + PaymentId  -- ID новой записи о платеже в базе

    Пример, только из обязательных полей
    https://secure.payonlinesystem.com/ru/payment/?MerchantId=55963&OrderId=1488&Amount=14.88&Currency=RUB&SecurityKey=5102efbbcc06dbc28e0b78cba163f58a
    """
    
    
    payment = Payment.objects.create(
        owner=user,
        payment_num=payment_num,
        operation_amount=amount,
        description=description
    )
    hash_str = 'MerchantId=%s&OrderId=%s&Amount=%s&Currency=RUB' % \
               (MERCHANT_ID, str(payment_num), '%.2f' % amount)
    #try:
    #    if user.customer.has_card and len(user.customer.rebill)>0:
    #        hash_str = 'MerchantId=%s&RebillAnchor=%s&OrderId=%s&Amount=%s&Currency=RUB' % \
    #                   (MERCHANT_ID, user.customer.rebill, str(payment_num), '%.2f' % amount)
    #except:
    #    pass
    hash_str += '&PrivateSecurityKey=%s' % PRIVATE_SECURITY_KEY
    security_key = md5(hash_str).hexdigest()

    data = {
        'MerchantId': MERCHANT_ID,
        'OrderID': str(payment_num),
        'Amount': '%.2f' % amount,
        'Currency': 'RUB',
        # 'OrderDescription': description.replace('.', ' ').encode('utf-8'),
        'SecurityKey': security_key,
        'ReturnUrl': quote(SUCCESS_URL),
        'FailUrl': quote(FAIL_URL),
        'PaymentId': str(payment.pk),
        'Email': user.email
    }
    try:
        if kwargs['additional'] == 'yes':
            data['agree'] = 'yes'
            user.customer.has_card = True
            user.customer.save()
    except:
        pass
    #import pdb; pdb.set_trace()
    url = 'https://secure.payonlinesystem.com/ru/payment/?' + urlencode(data)
    #try:
    '''
    if user.customer.has_card and len(user.customer.rebill):
        data['RebillAnchor'] = user.customer.rebill
        url = 'https://secure.payonlinesystem.com/payment/transaction/rebill/?' + urlencode(data)
        res = urllib2.urlopen(url)
        html = res.read()
        urlredirect = 'https://pressa.ru/Payonline/authform?%s' % (html,)
        return redirect(urlredirect)
    '''
    #except:
    #    pass
    return redirect(url)


def create_add_account_amount_transaction(user, amount):
    transaction = Transaction.objects.create(
        owner=user,
        operation=Transaction.CASH_PAYMENT_IN,
        operation_amount=amount,
        operation_real_payed=0,
        operation_object=user.customer)
    return transaction



def payment_payonline(request, customer_id, sum):
    user = Customer.objects.get(pk=customer_id)
    transaction = create_add_account_amount_transaction(user, sum)
    payment = Payment.objects.create(
        owner=user,
        payment_num=transaction.pk,
        operation_amount=sum,
        description='payonline payment'
    )
    hash_str = 'MerchantId=%s&OrderId=%s&Amount=%s&Currency=RUB' % \
               (MERCHANT_ID, str(transaction.pk), '%.2f' % sum)
    hash_str += '&PrivateSecurityKey=%s' % PRIVATE_SECURITY_KEY
    security_key = md5(hash_str.encode('utf-8')).hexdigest()
    data = {
        'MerchantId': MERCHANT_ID,
        'OrderID': str(transaction.pk),
        'Amount': '%.2f' % sum,
        'Currency': 'RUB',
        'SecurityKey': security_key,
        'ReturnUrl': quote(SUCCESS_URL),
        'FailUrl': quote(FAIL_URL),
        'PaymentId': str(payment.pk),
        'Email': user.email
    }
    url = 'https://secure.payonlinesystem.com/ru/payment/?' + urlencode(data)
    print(url)
    return redirect(url)
