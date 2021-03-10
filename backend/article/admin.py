from django.contrib import admin
from article.models import Article, ArticleCoverSetting


@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'issue', 'page', 'text', 'cover_tag']

@admin.register(ArticleCoverSetting)
class ArticleCoverSettingAdmin(admin.ModelAdmin):
    list_display = ['journal', 'title_x', 'title_y']

