def get_journal_type(key):
    if key == 'magazines':
        return 'magazine'
    elif key == 'newspapers':
        return 'paper'
    elif key == 'books':
        return 'book'
    elif key == 'abonement':
        return 'abonement'
    elif key == 'all':
        return 'all'
    else:
        raise Exception("Bad journal type")