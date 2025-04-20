from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Note(models.Model):
    author = models.ForeignKey(User,on_delete=models.CASCADE,related_name="notes")
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True,null=True)
    updated = models.DateTimeField(auto_now=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.name)