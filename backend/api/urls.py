from django.urls import path, include
from .views import AddNoteView,DeleteNoteView

urlpatterns = [
    path("notes/",AddNoteView.as_view(),name="create_note"),
    path("notes/delete/<int:pk>/",DeleteNoteView.as_view(),name="delete_note")
]