###  Набирается команда (2 чел) на проект.

Сайт-переделка pressa.ru.

Написан на Django 1.? + Angular 1! + CoffeScript лет 10 назад.

Морально и физически устарел.

Задача полностью обновить  дизайн и добавить принципиально новые фишки.
Например оживить ридер, место где человек читает статьи или просматривает журнал.
Журнал может быть в виде картинок страниц или текстовых статей.

Есть 2 варианта 

1. Написать новый сайт где обновить джангу, питон, ангуляр и пр и где нужно перетягивать код частями и модели базы в первую очередь.

2. Натянуть одну верстку на существующий сайт pressa.ru и допилить фишки.

Я склонился к варианту 1 так как при 2 есть риск создания нестабильного продукта .

Создал репозиторий.

https://github.com/zdimon/pressa-besa

Стек.

База Postgres структура базы полностью связана с основой и в процессе разработки миграции из pressa-besa (newpressa.pressa.ru) на основе (pressa.ru) неприемлемы.

Бекенд.

Свежая джанга с DRF.

Редисом кешируем.

Celery - задачи.

Запуск всех команд из папки backend.

Запуск.

     ./bin/c/django
     ./bin/c/celery

Загрузка тестовых данных (2-4 гига сьест)

     ./manage.py load_data

Фронтенд.

Сборка верстки (со временем влить в п 2)

  ./bin/c/frontend
    

2. React приложение

	./bin/c/build

Тесты бекенда тут.

https://newpressa.pressa.ru/api

Требуются специалисты со знанием.

Python Django Django Rest Framework Celery 

JS React JQuery. Angular будет приветствоваться для перетаскивания кода.

Верстка HTML флексбокс респонсивность.

Зарплата на этапе испытаний по факту выполнения задач и потраченного времени (5 $/h).

Если проявите находчивость рассмотрим ставку.

[ссылка да список разделов](tz.md)













