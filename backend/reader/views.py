from django.shortcuts import render
from django.core.exceptions import ObjectDoesNotExist
from journal.models import Issue, IssuePage
from article.models import Article
from django.http import Http404
from rest_framework.response import Response
from django.http import HttpResponse
from PIL import Image
from django.shortcuts import redirect
from sorl.thumbnail import get_thumbnail
from .utils import make_cached_image


def reader_index(request, issue_id, article_id=0):
    try:
        issue = Issue.objects.get(pk=issue_id)
    except ObjectDoesNotExist:
        raise Http404
    cnt = {"issue": issue}
    return render(request,'reader/index.html', cnt)


def text_reader_index(request, issue_id):
    try:
        issue = Issue.objects.get(pk=issue_id)
    except ObjectDoesNotExist:
        raise Http404
    articles = Article.objects.filter(issue=issue)
    cnt = {"issue": issue, "articles": articles}
    return render(request,'reader/index_text.html', cnt)



def get_page(request, page_id, type, position):
    page = IssuePage.objects.get(pk=page_id)
    make_cached_image(page,position)
    if type == 'low':
        original = Image.open(page.file_low.path)
    if type == 'middle':
        original = Image.open(page.file_middle.path)
    if type == 'hight':
        original = Image.open(page.file_high.path)
    response = HttpResponse(content_type="image/jpg")
    if original.size[0] < original.size[1]:
        original.save(response, 'JPEG')
        return response
    if position == 1:
        cropped_example = original.crop((0, 0, original.size[0]/2, original.size[1]))
        cropped_example.save(response, 'JPEG')
        return response      

    if position == 2:
        cropped_example = original.crop((original.size[0]/2, 0, original.size[0], original.size[1]))
        cropped_example.save(response, 'JPEG')
        return response 

        #image_data = open(page.file_low.path, "rb").read()

    #return HttpResponse(image_data, content_type="image/jpg")

    #return HttpResponse('OK')