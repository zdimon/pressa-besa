from django.contrib import admin
from .models import Subscription, UserSubscrition
# Register your models here.


class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ('name', 'journal', )
    search_fields = ('name', 'journal__name_ru', )
    list_filter = ('count', 'months')
    raw_id_fields = ('journal', )
    autocomplete_lookup_fields = {
        'fk': ['journal'],
    }


admin.site.register(Subscription, SubscriptionAdmin)


class UserSubscritionAdmin(admin.ModelAdmin):
    list_filter = ('subscription',)
    list_display = ('create', 'owner', 'subscription',
                    'journal', 'count', 'update', )


admin.site.register(UserSubscrition, UserSubscritionAdmin)