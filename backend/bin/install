python3 -m venv venv
. ./venv/bin/activate
pip3 install -r requirements.txt
rm db.sqlite3
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