from git import Repo
from django.conf import settings
import os

def current_branch(request):
    local_repo = Repo(path=os.path.join(settings.BASE_DIR, '..'))
    local_branch = local_repo.active_branch.name
    return {'git_branch': local_branch}