from django.db import models
from django.utils.translation import ugettext as _
from django.urls import reverse
import os
from django.conf import settings
from sorl.thumbnail import get_thumbnail
import shutil

opt = ['170-220', '260-340', '520-680', '306-433', '205-282']

def create_dirs(issue):
    path = os.path.join(settings.MEDIA_ROOT, 'covers')
    path_journal = os.path.join(path, issue.journal.name_slug)
    if not os.path.exists(path_journal):
        os.makedirs(path_journal)
    path_year = os.path.join(path, issue.journal.name_slug, str(issue.release_date.year))
    if not os.path.exists(path_year):
        os.makedirs(path_year)
    path_issue = os.path.join(path_year, str(issue.id))
    if not os.path.exists(path_issue):
        os.makedirs(path_issue)
    for p in opt:       
        path = os.path.join(path_issue, p)
        if not os.path.exists(path):
            os.makedirs(path)

class CoverMixin(models.Model):

    @property
    def small_cover(self):
        if (self.is_covers_created):
            return self.cover_url_mask.replace('{size}', '170-220')
        else:
            return reverse('cover_make-cover', args=['issue', '170-220', self.pk])

    @property
    def mobile_cover(self):
        if (self.is_covers_created):
            return self.cover_url_mask.replace('{size}', '520-680')
        else:
            return reverse('cover_make-cover', args=['issue', '520-680', self.pk])

    @property
    def mobile_thumb(self):
        if (self.is_covers_created):
            return self.cover_url_mask.replace('{size}', '260-340')
        else:
            return reverse('cover_make-cover', args=['issue', '260-340', self.pk])

    @property
    def just_cover(self):
        if (self.is_covers_created):
            return self.cover_url_mask.replace('{size}', '306-433')
        else:
            return reverse('cover_make-cover', args=['issue', '306-433', self.pk])

    @property
    def common_cover(self):
        if (self.is_covers_created):
            return self.cover_url_mask.replace('{size}', '205-282')
        else:
            return reverse('cover_make-cover', args=['issue', '203-280', self.pk])

    def set_cover_mask_url(self):
        path = '/media/covers/%s/%s/%s/{size}/cover.png' % (self.journal.name_slug, self.release_date.year, self.id)
        self.cover_url_mask = path
        self.is_covers_created = True
        self.save()

    def make_covers(self):
        create_dirs(self)
        self.set_cover_mask_url()
        
        for p in opt:
            op = p
            if p == '306-433' and self.journal.cover_size != '':
                p = self.journal.cover_size
            pp = p.replace('-', 'x')
            try:
                im = get_thumbnail(self.cover, pp, crop='top')
                #print(im.url.replace('/media',''))
                source = str(settings.MEDIA_ROOT)+str(im.url.replace('/media', ''))
                dest = os.path.join(settings.MEDIA_ROOT, 'covers', self.journal.name_slug, str(self.release_date.year), str(self.id), op, 'cover.png')
                shutil.copyfile(source, dest)
                inlog = "Process %s of %s" % (p, self.pk)
            except Exception as e:
                print(str(e))

    class Meta:
        abstract = True
