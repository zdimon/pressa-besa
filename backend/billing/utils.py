from billing.models import Transaction
from journal.models import PurchasedIssues

def buy_issue_transaction(user, issue):
    transaction = Transaction.objects.create(
        owner=user,
        operation=Transaction.BUY,
        operation_amount=issue.journal.amount,
        operation_real_payed=0,
        operation_object=issue)
    return transaction


def buy_issue_purchase(user, issue):
    p = PurchasedIssues.objects.create(
        customer=user,
        journal=issue.journal,
        issue=issue,
        purchased_type='once')
    return p
