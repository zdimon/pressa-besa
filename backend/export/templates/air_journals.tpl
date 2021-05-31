<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:media="http://search.yahoo.com/mrss/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:georss="http://www.georss.org/georss">
    <channel>
        <title>Выгрузка из pressa.ru</title>
        <link>http://pressa.ru/</link>
        <pubDate>{{ now }}</pubDate>
        <lastBuildDate>{{ now }}</lastBuildDate>
        <description>Читай и подписывайся!</description>
        <language>ru</language>
        {% for j in journals %}
        <item>
           <title>{{ j.name }}</title>
           <description></description>
           <issueNumber>{{ j.id }}</issueNumber>
           <link>{{DOMAIN}}/export/air/articles/{{ j.id }}</link>
           <pubDate>{{j.last_issue.release_date|date:"Y-m-d"}}</pubDate>
           <guid>{{j.last_issue.id}}</guid>
           <image>
                <url>{{DOMAIN}}{{j.just_cover}}</url>
                <title>{{ j.last_issue.name }}</title>
           </image>
        </item>
        {% endfor %}
    </channel>
</rss>