from django.shortcuts import render
from django.contrib import messages
import logging
logger = logging.getLogger(__name__)


def customer_use_giftcode(customer, code_string):
    from journal.models import PurchasedIssues, Issue
    from subscribe.models import Subscription, UserSubscrition, UserAbonement

    item = None
    code = None

    logger.info("%s entered promo/gift code %s", customer, code_string)

    try:
        code = GiftCode.objects.get(code=code_string,
                                    is_active=True)
        item = code.content_object
    except GiftCode.DoesNotExist:
        try:
            code = PromoCode.objects.get(code=code_string, is_active=True)
            if code.program.is_abonement == True:
                start_date = timezone.now()
                stop_date = start_date + timedelta(
                days=int(code.program.months_abonement)*30)
                UserAbonement.objects.create(
                    user=customer,
                    abonement=Abonement.objects.get(pk=1),
                    start_date=start_date,
                    stop_date=stop_date
                )
                return "/personal/"
            else:
                item = code.program.availablebypromoprogram_set.get().content_object
                if code.program.promocode_set.filter(used=customer):
                    return None
        except PromoCode.DoesNotExist:
            pass

    if not item:
        return None
    if code.program.amount_buy>0:
        type_transaction = Transaction.BUY
    else:
        type_transaction = Transaction.USE_GIFT
    if isinstance(item, Issue):
        issue = item
        PurchasedIssues.objects.create(
            customer=customer,
            purchased_type='giftcode',
            issue=issue)
        transaction = Transaction.objects.create(
            owner=customer.user_ptr,
            operation=type_transaction,
            operation_amount=code.program.amount,
            operation_real_payed=code.program.amount,
            operation_object=issue)
        code.is_active = False
        code.used = customer
        code.save()
        transaction.approved = True
        transaction.save()
        return issue.reader_url_for_page()
    elif isinstance(item, Subscription):
        subscription = item
        # Проверим деньги на счету
        if(customer.amount>=code.program.amount):
            user_subscription = UserSubscrition.objects.create(
                owner=customer,
                subscription=subscription)
            transaction = Transaction.objects.create(
                owner=customer.user_ptr,
                operation=type_transaction,
                operation_amount=code.program.amount,
                operation_real_payed=code.program.amount,
                operation_object=subscription)
            code.is_active = False
            code.used = customer
            code.save()
            transaction.approved = True
            transaction.save()
            customer.amount -= code.program.amount
            customer.save()

            # если есть предыдущие номера, надо сразу выдать юзеру самый свежий
            # то, что он его ещё не купил, проверено в purchase_by_subscription()
            if Issue.objects.filter(journal=subscription.journal).exists():
                issue = Issue.objects \
                    .filter(journal=subscription.journal) \
                    .order_by("-release_date")[0]
                purchase_by_subscription(issue, user_subscription)
            return "/personal/"
    else:
        return None



def promocode(request):
    if request.method == 'POST':
        rawcode = request.POST.get('promocode')
        code = rawcode.replace('-', '').replace(' ', '')
        redirect_url = customer_use_giftcode(request.user.customer, code)
        messages.success(request, 'Your profile was updated.')
    return render(request, 'lk/pages/promocode.html', {})