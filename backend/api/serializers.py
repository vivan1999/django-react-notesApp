from django.contrib.auth.models import User
from rest_framework.serializers import ModelSerializer
from .models import Note

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password"]
        extra_kwargs ={"password":{"write_only":True}}

    def create(self, validated_user):
        user = User.objects.create_user(**validated_user)
        return user
    
class NoteSerailizer(ModelSerializer):
    class Meta:
        model = Note
        fields = ["id","author","title","description","created"]
        extra_kwargs ={"author":{"read_only":True}}
