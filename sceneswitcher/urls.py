
from django.contrib import admin
from django.urls import path,include
from django.conf.urls.static import static
from django.conf import settings 
from .views import *
urlpatterns = [
  
    path('',index,name='index'),
    path('app',app,name='app'),
    path('login',login,name='login'),
    path('video_processing',video_processing_page,name='video_processing'),
    path('process_video',process_video,name='process_video'),
    path('process',process,name='process'),
    path('uploads/<str:file_name>', load_media_file, name='load_media'),
    path('get_srt_index', get_srt_index, name='get_srt_index'),
    path('download', download, name='download'),

    path('upload_new_scene',upload_new_scene,name='upload_new_scene'),
]
