from django.contrib import admin
from modeltranslation.admin import TranslationAdmin
from django.contrib.flatpages.models import FlatPage
from django.contrib.flatpages.admin import FlatPageAdmin
from flatblocks.admin import FlatBlockAdmin
from flatblocks.models import FlatBlock


class NewFlatPageAdmin(TranslationAdmin, FlatPageAdmin):
    
    class Media:
        js = ['/static/grappelli/tinymce/jscripts/tiny_mce/tiny_mce.js',
              '/static/grappelli/tinymce_setup/tinymce_setup.js']

admin.site.unregister(FlatPage)
admin.site.register(FlatPage, NewFlatPageAdmin)


class NewFlatBlockAdmin(TranslationAdmin, FlatBlockAdmin):
    class Media:
        js = ['/static/grappelli/tinymce/jscripts/tiny_mce/tiny_mce.js',
              '/static/grappelli/tinymce_setup/tinymce_setup.js']

admin.site.unregister(FlatBlock)
admin.site.register(FlatBlock, NewFlatBlockAdmin)              