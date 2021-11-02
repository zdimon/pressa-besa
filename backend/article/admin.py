from django.contrib import admin
from article.models import Article, ArticleCoverSetting, ArticleFontSetting, ArticleImages
from django.utils.safestring import mark_safe

@admin.register(Article)
class ArticleAdmin(admin.ModelAdmin):
    list_display = ['title', 'issue', 'page', 'text', 'taggit_list', 'cover_tag', 'audio_converted']
    def taggit_list(self, obj):
        return u", ".join(o.name for o in obj.taggit.all())

@admin.register(ArticleImages)
class ArticleImagesAdmin(admin.ModelAdmin):
    list_display = ['article', 'thumbnailsmall_tag']


@admin.register(ArticleCoverSetting)
class ArticleCoverSettingAdmin(admin.ModelAdmin):
    list_display = ['journal', 'title_x', 'title_y']
    search_fields = ['journal__name']
    raw_id_fields = ('journal', )
    readonly_fields = ('cover_img', 'test_link')

    def cover_img(self, obj):
        return mark_safe(f'<img width="500" src="{obj.cover_url()}" />')

    def test_link(self, obj):
        return mark_safe(f'<a target=_blank class="button" href="/v1/api/article/test/cover/{obj.id}" />Тест</a>')
    

@admin.register(ArticleFontSetting)
class ArticleFontSettingAdmin(admin.ModelAdmin):
    list_display = ['name', 'file']
