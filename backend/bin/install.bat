pip3 install -r requirements.txt
python3 manage.py migrate
python3 manage.py load_users
python3 manage.py load_journals
python3 manage.py load_articles
python3 manage.py load_fonts
python3 manage.py proc_cover
python3 manage.py load_news
python3 manage.py load_office
python3 manage.py load_mail_template
python3 manage.py load_abonement