from django.shortcuts import render
from django.views.generic import DetailView, ListView
from journal.models import Journal, Issue
from catalog.models import Category
from django.core.exceptions import ObjectDoesNotExist
from django.http import Http404
from article.models import Article


class JournalView(DetailView):
    model = Journal
    slug_url_kwarg = 'name_slug'
    slug_field = 'name_slug'

    def get_customer(self):
        try:
            if not self.request.user.is_anonymous:
                return self.request.user.customer
            else:
                return None
        except ObjectDoesNotExist:
            return None

    def get_context_data(self, **kwargs):
        self.customer = self.get_customer()
        issue_name_slug = self.kwargs.get('issue_name_slug', None)
        try:
            if issue_name_slug:
                self.current_issue = self.object.active_issue_set.get(
                    name_slug=issue_name_slug)
            else:

                self.current_issue = self.object.last_issue
        except Exception as e:
            print(e)
            raise Http404
        context = super(JournalView, self).get_context_data(**kwargs)
        try:
            context['more_issues'] = Issue.objects.filter(journal=self.object).exclude(pk=self.current_issue.id).order_by('-id')[0:10]
        except:
            context['more_issues'] = Issue.objects.filter(journal=self.object).order_by('-id')[0:10]            
        context['categories'] = Category.objects.filter(show_in_new_catalog=True)
        context['current_issue'] = self.current_issue
        context['articles'] = Article.objects.filter(issue=self.current_issue)
        return context