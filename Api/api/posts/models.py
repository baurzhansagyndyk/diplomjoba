from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _


class Post(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100, blank=True, default='')
    body = models.TextField(blank=True, default='')
    image = models.ImageField(
        verbose_name=_('post image'),
        help_text=_('Upload image to post'),
        upload_to='posts/%Y/%m/%d/',
        default='posts/default.png')
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')
    likes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='liked_posts', blank=True)

    class Meta:
        ordering = ['created']

    def __str__(self):
        return self.title


class Report(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='reports')
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='owner_reports')
    admin = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.Model, related_name='reports')
    text = models.TextField()
    is_active = models.BooleanField(default=True)
