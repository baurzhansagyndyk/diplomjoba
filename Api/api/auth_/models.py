from django.contrib.auth.models import AbstractUser
from django.db import models
from posts.models import Post


# Create your models here.
class User(AbstractUser):
    favorite_posts = models.ManyToManyField(Post, related_name='favorite_users', blank=True)
