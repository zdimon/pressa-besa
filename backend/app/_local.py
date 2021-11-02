from pathlib import Path

# Build paths inside the project like this: BASE_DIR / 'subdir'.
DIR = Path(__file__).resolve().parent.parent


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': DIR / 'db.sqlite3',
    }
}

BACKEND_URL = 'http://localhost:8000'

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql_psycopg2', # Add 'postgresql_psycopg2', 'mysql', 'sqlite3' or 'oracle'.
#         'NAME': '',                                   # Or path to database file if using sqlite3.
#         'USER': '',                                   # Not used with sqlite3.
#         'PASSWORD': '',                             # Not used with sqlite3.
#         'HOST': 'localhost',                              # Set to empty string for localhost. Not used with sqlite3.
#         'PORT': '5432',                                         # Set to empty string for default. Not used with sqlite3.
#     }
# }


SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = '..'
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = '...'

EMAIL_BACKEND = 'django.core.mail.backends.filebased.EmailBackend'
EMAIL_FILE_PATH = '/home/zdimon/Desktop/work/pressa-besa/tmp/mail-messages'
IMAGE_CACHE_DIR = '/home/zdimon/Desktop/work/pressa-besa/media/cached_images'

VK_APP_ID = "..."
VK_API_SECRET = "..."

ODNOKLASSNIKI_OAUTH2_CLIENT_KEY = "..."
ODNOKLASSNIKI_OAUTH2_APP_KEY = "..."
ODNOKLASSNIKI_OAUTH2_CLIENT_SECRET = "......"

FACEBOOK_APP_ID = '...l.'
FACEBOOK_API_SECRET = '...'
FACEBOOK_EXTENDED_PERMISSIONS = ['email']
FACEBOOK_PROFILE_EXTRA_PARAMS = {'locale': 'ru_RU','fields':'email,name,first_name,last_name'}

MAILRU_OAUTH2_APP_KEY = '...'
MAILRU_OAUTH2_CLIENT_KEY = '...'
MAILRU_OAUTH2_CLIENT_SECRET = '....'

SOCIAL_AUTH_TWITTER_KEY = '...'
SOCIAL_AUTH_TWITTER_SECRET = '...'

AUDIO_PATH = '/home/zdimon/Desktop/work/pressa-besa/tmp'

