#!/usr/bin/python3
# -*- coding: utf-8 -*-

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
    folder_id = 'b1gtqppf1r8hmhknrmae'
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
            raise RuntimeError("Invalid response received: code: %d, message: %s" % (resp.status_code, resp.text))

        for chunk in resp.iter_content(chunk_size=None):
            yield chunk



# textlist = query('''select text,id,title from article_article aa where id= 155284 ''')

# with open(textlist[0][2].decode('utf-8') + '.ogg', "wb") as f:
#     for text in split_text(cleantext(textlist[0][0])):
#         for audio_content in synthesize(ya_auth(), text):
#             f.write(audio_content)
#
#
text=u'''Исла Тесоро 2 июня 1679 года.

Далеко на северо-востоке от Эспаньолы расположился остров Исла Тесоро. Скрытый от чужих глаз огромными рифами и защищенный морскими течениями здесь нашли пристанище пираты. Здесь делили награбленное, сбывали контрабанду. Высшие чины всех стран заглядывали сюда если им нужно было провернуть свои темные делишки. На острове даже располагалась верфь, где опытный корабел способен был привести видавшую карибы лоханку в быстрый и маневренный корабль. В таверне всегда были за умеренную плату пойти в команду головорезы не знающие страха и боли, готовые умереть за своего капитана. Полки магазинов ломились от товаров, которых не сыскать как в старом так и новом свете. Николас Шарп прогуливался по палубе своего корабля. Быстрый фрегат Фотртуна достался ему от своего покойного отца. Сошедший с элитной ферфи в Англии, чертеж корабля был утерян навсегда. Корабелы добились невозможного, по скорости Фортуне не было равных. Прямая оснастка фрегата обеспечивала ему скорость до девятнадцати узлов, а косой парус на бизань(задней) мачте позволял ходить в бейдевинд(против ветра). Курсовой угол уступал лишь более легким кораблям, таким как люгер или щебека. Маневренность также была на высоте в сочетании с более легкой работой команды с парусами. Конечно, чтобы добиться высоких характеристик пришлось уменьшить трюм и количество орудий, а также их калибр. Тем не менее сорок две двадцатифунтовые усиленные кулеврины в сочетании с усиленным корпусом позволяли Фортуне вести бой даже с тяжелыми кораблями первого и второго класса, а в нужный момент выйти из боя или догнать более легкую добычу. Солнце уже садилось за горизонт и Николас отправился в каюту, чтобы обдумать предстоящее дело. Разведка доложила, что через два дня испанский золотой флот выходит из ПортоБелло. Письмо нашло своего получателя. Положение пиратов было не лучшее. Торговые караваны уже не были легкой добычей. Толстосумы стали включать во флоты военные корабли. Все чаще попадались конвои имеющие в своем охранении корветы, фрегаты и тяжелые галеоны. Все чаще добыча давала отпор, лишь изредка удача поварачивалась лицом и пиратский корабль из рейда возвращался с добычей. Стычки происходили постоянно. От всей этой котовасии выгоду имела лиш Голландия. Вест-Индская компания сдавала корабли в аренду, брала плату за охрану, диктовала свои правила торговли. Скупая ресурсы по бросовым ценам и продавая необходимые по завыщенным в десятки раз Лукас Ротенбург, глава Вест-Индской торговой кампании купался в золоте. Поэтому Шарп принял решение напасть на Золотой флот. Выйдя с Панамы примерно через месяц он достигнет острова Кайман, который был выбран местом нападения, и где в это время начинается сезон штормов, а значит будет ветер который нужен Фортуне.Король Испании не будет ждать нападения в это время, а значит не будет патрулей. А время,пока новость дойдет до короля, позволит пиратам уйти с добычей на безопастное расстояние. Шарп был опытным капитаном, команда фрегата неоднократно брала на абордаж крупные корабли и вела бой с превосходящими силами противника. Николас прекрастно понимал, что нападение в одиночку это безумие. Нужны были еще корабли которые займут делом корабли охранения. Причем это должны быть быстрые корабли способные выйти из боя и не пойти ко дну раньше, чем добыча. Два быстрых корвета, старые друзья Николаса, прибудут завтра утром. Еще два корабля, бриг Валькирия и щебека Мейфенг, уже стояли на якоре возле поселения. Вся флотилия способна добраться до Каймана максимум за три недели. В запасе есть еще одна неделя, чтобы как следует подготовиться. Наступила ночь, в свете луны между ограмных скал алые паруса выглядели зловеще. Фрегат готовился к бою.


Акватория острова Кайман. Спустя месяц.'''
with open('1112' + '.ogg', "wb") as f:
    for text in split_text(cleantext(text)):
        for audio_content in synthesize(ya_auth(), text):
            f.write(audio_content)