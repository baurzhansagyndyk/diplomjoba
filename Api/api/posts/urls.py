from django.urls import path
from .views import PostViewSet, ReportViewSet, send_mail_to_admin

app_name = 'posts'

post_list = PostViewSet.as_view({
    'get': 'list',
    'post': 'create',
})

post_detail = PostViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy',
})

post_detail_likes = PostViewSet.as_view({
    'put': 'add_like',
    'delete': 'remove_like',
})

post_detail_favorites = PostViewSet.as_view({
    'put': 'add_to_favorites',
    'delete': 'remove_from_favorites',
})

post_list_favorites = PostViewSet.as_view({
    'get': 'favorite_posts',
})

owner_post_list = PostViewSet.as_view({
    'get': 'owner_posts',
})

report_list = ReportViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

urlpatterns = [
    path('posts/', post_list, name='post_list'),
    path('posts/<int:pk>/', post_detail, name='post_detail'),
    path('posts/<int:pk>/likes/', post_detail_likes, name='post_detail_likes'),
    path('posts/<int:pk>/favorites/', post_detail_favorites, name='post_detail_favorites'),
    path('posts/favorites/', post_list_favorites, name="post_list_favorites"),
    path('posts/my/', owner_post_list, name="owner_post_list"),
    path('send_mail/', send_mail_to_admin, name='send_mail_to_admin'),
    path('reports/', report_list, name='report_list'),
]
