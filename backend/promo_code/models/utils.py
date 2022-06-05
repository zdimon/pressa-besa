import random

def codegenerator(length=20):
    symbols = ['q','w','e','r','t','y','u','i','p','s','a','d','f','g','h','j','k','l','z','x','v','b','n','m']
    return ''.join([random.choice(symbols) for x in range(0,length)])


def code_format(code, step=5):
    result = list(code)
    index = 5
    spaces = 0
    while index < len(code):
        result.insert(index+spaces,'-')
        index+=5
        spaces+=1
    return "".join(result)

