<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:media="http://search.yahoo.com/mrss/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    xmlns:georss="http://www.georss.org/georss">
    <channel>
        <title>Статьи издания {{ issue.journal.name }}</title>
        <description>Читай и подписывайся!</description>
        <link>http://pressa.ru/</link>
        <pubDate>{{ issue.release_date|date:"Y-m-d" }}</pubDate>
        <issueNumber>{{ issue.name }}</issueNumber>
        <lastBuildDate>{{ issue.release_date|date:"Y-m-d" }}</lastBuildDate>
        <guid>{{ issue.id }}</guid>
        <image>{{DOMAIN}}{{ issue.common_cover }}</image>
        
        <language>ru</language>
        {% for a in issue.article_set.all %}
        <item>
           <title>{{ a.title }}</title>
           <description>{{ a.short_text }}</description>
           <content>{{ a.text }}</content>
           <imageAnnounce>{{DOMAIN}}{{ a.get_image.image.url }}</imageAnnounce>
           <image>{{DOMAIN}}{{ a.get_image.image.url }}</image>
        </item>
        {% endfor %}
    </channel>
</rss>