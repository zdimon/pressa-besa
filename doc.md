Фронтенд

JS jquery - императивный

users = ['Dima', 'Vova'....]

<ul>
users.lenght
    for(i, i =< l, i++) {
        <li></li>
    }

    <li for="i in users" >{i}</li>
<ul>

REACT Vue Angular (Typescript) - декларативные

Coffescript



Бекенд

Python 

Django макро

routing 

path('', func1) 
path('/users', func2) 

func1(request):
    request.POST
    request.GET
    return response

templating

    {% for user in users %}
        {% if user.age > 30 %}
            <p>{ user.name }</p>
        {% endif %}
    {% endfor %}

ORM 

   SELECT * FROM users WHERE name = '' 

   users = Users.objects.filter(name='dima')
   for user in users:
       user.name = ''
       user.save()
       user.delete()

DRF 

Flask - микрофрейворк


Девопс

GIT 

Docker 














