from app.settings import IMAGE_CACHE_DIR
from pathlib import Path
from os.path import join
from PIL import Image
import os

def is_cached(page):
    p = join(IMAGE_CACHE_DIR, str(page.paper.id))
    if os.path.isdir(p):
        return True
    else:
        return False

def make_dirs(page):
    p = join(IMAGE_CACHE_DIR, str(page.paper.id))
    Path(p).mkdir(parents=True, exist_ok=True)
    p = join(IMAGE_CACHE_DIR, str(page.paper.id),'1')
    Path(p).mkdir(parents=True, exist_ok=True)
    p = join(IMAGE_CACHE_DIR, str(page.paper.id),'2')
    Path(p).mkdir(parents=True, exist_ok=True)
    p = join(IMAGE_CACHE_DIR, str(page.paper.id),'1','low')
    Path(p).mkdir(parents=True, exist_ok=True)
    p = join(IMAGE_CACHE_DIR, str(page.paper.id),'2','low')
    Path(p).mkdir(parents=True, exist_ok=True)
    p = join(IMAGE_CACHE_DIR, str(page.paper.id),'1','middle')
    Path(p).mkdir(parents=True, exist_ok=True)
    p = join(IMAGE_CACHE_DIR, str(page.paper.id),'2','middle')
    Path(p).mkdir(parents=True, exist_ok=True)



def make_cached_image(page, position):
    make_dirs(page)
    original = Image.open(page.file_low.path)
    if original.size[0] < original.size[1]:
        path = join(IMAGE_CACHE_DIR, str(page.paper.id), str(position), 'low' ,f'{page.id}.jpg')
        original.thumbnail((150,250), Image.ANTIALIAS)
        original.save(path, "JPEG", quality=100)
    else:
        if position == 1:
            # low
            original = Image.open(page.file_low.path)
            cropped_example = original.crop((0, 0, original.size[0]/2, original.size[1]))
            path = join(IMAGE_CACHE_DIR, str(page.paper.id),str(position),'low',f'{page.id}.jpg')
            cropped_example.thumbnail((150,250), Image.ANTIALIAS)
            cropped_example.save(path, "JPEG", quality=100)
            #middle
            original = Image.open(page.file_middle.path)
            cropped_example = original.crop((0, 0, original.size[0]/2, original.size[1]))
            path = join(IMAGE_CACHE_DIR, str(page.paper.id),str(position),'middle',f'{page.id}.jpg')
            cropped_example.save(path, "JPEG", quality=100)

        if position == 2:
            #low
            original = Image.open(page.file_low.path)
            cropped_example = original.crop((original.size[0]/2, 0, original.size[0], original.size[1]))
            path = join(IMAGE_CACHE_DIR, str(page.paper.id),str(position),'low',f'{page.id}.jpg')
            cropped_example.thumbnail((150,250), Image.ANTIALIAS)
            cropped_example.save(path, "JPEG", quality=100)
            #middle
            original = Image.open(page.file_low.path)
            cropped_example = original.crop((original.size[0]/2, 0, original.size[0], original.size[1]))
            path = join(IMAGE_CACHE_DIR, str(page.paper.id),str(position),'middle',f'{page.id}.jpg')
            cropped_example.save(path, "JPEG", quality=100)