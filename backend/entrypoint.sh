#!/bin/sh
echo "Start container"

./manage.py migrate
./manage.py runserver 0.0.0.0:8000

# while :
# do
#     sleep 5
#     echo "Ok"
# done