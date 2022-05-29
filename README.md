# Pressa..

## Установка

    sudo apt-get install python3-venv

    git clone git@github.com:zdimon/pressa-besa.git
    cd pressa-besa/app
    ./bin/install

Пройдет немало времени и займет около 6 ГБ в папке media!

## Переименовываем app/.env_template в .env и настраиваем переменные окружения

## Настройка окружения фронтенда

    cp frontend/src/config.tsx.template frontend/src/config.tsx


## Запускаем через докер

    ./bin/up

Откроет 80 порт с nginx по адресу http://localhost.

## Запуск НЕ через докер.

    cd backend

Джанго сервер

    ./bin/c/django

Сокет-сервер

    ./bin/c/socket

Celery

    ./bin/c/celery

Фронтенд (сборка с отслеживанием)

    ./bin/c/frontend

Админ интерфейс (сервер с сборкой и отслеживанием)

    ./bin/c/admin

Для успешного проксирования админки на сервер джаного необходимо добавить сторку в /etc/hosts

    127.0.0.1 pressa-django

Так же в файле backend/.env прописать  

    REDIS_HOST=localhost
    BACKEND_URL='http://localhost:8000'

[ссылка на требования](req.md)

test



