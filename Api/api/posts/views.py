from django.contrib.auth.models import Group
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework import filters
from rest_framework import status
from auth_.models import User
from rest_framework import viewsets
from rest_framework import permissions
from .models import Post, Report
from .serializers import UserSerializer, GroupSerializer, PostSerializer, ReportSerializer
from django.core.mail import send_mail


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['title']

    # permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    @action(methods=['put'], detail=True)
    def add_like(self, request, pk=None):
        post = self.get_object()
        post.likes.add(request.user)
        post.save()
        return Response({'message': 'Like is added'})

    @action(methods=['delete'], detail=True)
    def remove_like(self, request, pk=None):
        post = self.get_object()
        post.likes.remove(request.user)
        post.save()
        return Response({'message': 'Like is successfully removed'})

    @action(methods=['put'], detail=True)
    def add_to_favorites(self, request, pk=None):
        post = self.get_object()
        post.favorite_users.add(request.user)
        post.save()
        return Response({'message': 'Successfully added to favorites'})

    @action(methods=['delete'], detail=True)
    def remove_from_favorites(self, request, pk=None):
        post = self.get_object()
        post.favorite_users.remove(request.user)
        post.save()
        return Response({'message': 'Successfully removed from favorites'})

    @action(methods=['get'], detail=False)
    def favorite_posts(self, request):
        return _get_posts(self, request.user.favorite_posts)

    @action(methods=['get'], detail=False)
    def owner_posts(self, request):
        return _get_posts(self, request.user.posts)


class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user,
                        admin=get_user_model().objects.get(username='admin'))


@api_view(['POST'])
def send_mail_to_admin(request):
    data = request.data
    email = data.get('email')
    phone = data.get('phone_number')
    name = data.get('name')
    comments = data.get('comments') or ''
    if not email or not phone or not name:
        return Response({'message': 'Provide required fields'}, status=status.HTTP_400_BAD_REQUEST)
    result_text = f'Name: {name} \n' \
                  f'Email: {email} \n' \
                  f'Phone Number: {phone} \n' \
                  f'Comments:  {comments}'

    send_mail(
        'Contact us',
        result_text,
        'ifeedback@internet.ru',
        ['ifeedback@internet.ru'],
        fail_silently=False,
    )

    return Response({"message": "Successfully sent!"})


def _get_posts(self, posts):
    owner_posts = posts

    page = self.paginate_queryset(owner_posts)
    if page is not None:
        serializer = self.get_serializer(page, many=True)
        return self.get_paginated_response(serializer.data)

    serializer = self.get_serializer(owner_posts, many=True)
    return Response(serializer.data)
