from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Post, Report


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']


class ReportSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    admin = serializers.ReadOnlyField(source='admin.username')
    post_title = serializers.ReadOnlyField(source='post.title')
    post_id = serializers.IntegerField()

    class Meta:
        model = Report
        fields = ('id', 'owner', 'admin', 'post_title', 'post_id', 'text', 'is_active')


class PostSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    is_liked = serializers.SerializerMethodField(read_only=True)
    favorites = serializers.SerializerMethodField(read_only=True)
    is_favorited = serializers.SerializerMethodField(read_only=True)
    serializers.ImageField(use_url=True, required=False, allow_null=True)
    created = serializers.DateTimeField(format="%Y-%m-%d", required=False, read_only=True)

    class Meta:
        model = Post
        fields = '__all__'

    def get_is_liked(self, obj):
        if self.context.get('request').user.pk in obj.likes.values_list(flat=True):
            return True
        return False

    def get_likes(self, obj):
        return obj.likes.count()

    def get_is_favorited(self, obj):
        if self.context.get('request').user.pk in obj.favorite_users.values_list(flat=True):
            return True
        return False

    def get_favorites(self, obj):
        return obj.favorite_users.count()

    def get_is_owner(self, obj):
        requestedUser = self.context.get('request').user
        return obj.owner.pk == requestedUser.pk or requestedUser.username == 'admin'
