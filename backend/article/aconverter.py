import requests
import json
from bs4 import BeautifulSoup

def split_text(text):
    tts_array = []
    length = 0
    check_array = []
    split_text = text.split('.')
    for i in split_text:
        if length > 4000:
            tts_array.append(check_array)
            check_array = []
            length = 0
        check_array.append(i)
        length = length + len(i)
    sumary = 0
    for i in tts_array:
        sumary = sumary + (len(i))
    tts_array.append(split_text[sumary:])
    result = []
    for i in tts_array: result.append('.'.join(i) + '.')
    return result


def ya_auth():
    oauth_token = 'AgAAAAAhpnDqAATuwag50K48MUamtcZ7Sk_R3hw'
    auth_url = 'https://iam.api.cloud.yandex.net/iam/v1/tokens'
    data = {'yandexPassportOauthToken': oauth_token}
    r = requests.post(auth_url, json=data)
    iamToken = json.loads(r.text)['iamToken']
    return iamToken


def cleantext(text):
    result = BeautifulSoup(text, "lxml").text
    return result


def synthesize(iam_token, text):
    folder_id = 'b1gskl9a8jukhocf1rtk'
    url = 'https://tts.api.cloud.yandex.net/speech/v1/tts:synthesize'
    headers = {
        'Authorization': 'Bearer ' + iam_token,
    }

    data = {
        'text': text,
        'lang': 'ru-RU',
        'folderId': folder_id,
        'voice': 'filipp'
    }

    with requests.post(url, headers=headers, data=data, stream=True) as resp:
        if resp.status_code != 200:
            print('Error converting')
            return False
            #raise RuntimeError("Invalid response received: code: %d, message: %s" % (resp.status_code, resp.text))

        for chunk in resp.iter_content(chunk_size=None):
            yield chunk



text=u'''Исла к бою. Акватория острова Кайман. Спустя месяц.'''

from django.conf import settings

def make_audio_article(article):
    print(f'Process {article.title}')
    path = f'{settings.AUDIO_PATH}/article-{article.pk}.ogg'
    print(f'{path}')
    try:
        with open(path, "wb") as f:
            for text in split_text(cleantext(article.text)):
                for audio_content in synthesize(ya_auth(), text):
                    f.write(audio_content)
        
        article.audio_converted = True
        article.save()
    except:
        print('Errorrrrrr')


def make_audio_news(news):
    print(f'Process {news.id}')
    path = f'{settings.AUDIO_PATH}/announce-{news.pk}.ogg'
    print(f'{path}')
    try:
        with open(path, "wb") as f:
            for text in split_text(cleantext(news.text)):
                for audio_content in synthesize(ya_auth(), text):
                    f.write(audio_content)
        
        news.audio_converted = True
        news.save()
    except:
        print('Errorrrrrr')
