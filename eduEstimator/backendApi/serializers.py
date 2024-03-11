from rest_framework import serializers
from django.contrib.auth.models import User


class PredictionInputSerializer(serializers.Serializer):
    marks = serializers.FloatField()
    gender = serializers.CharField()
    branch = serializers.CharField()
    category = serializers.CharField()
    home_university = serializers.CharField()
    University = serializers.CharField()
    University_Type = serializers.CharField()
    College = serializers.CharField()
    Year = serializers.CharField()
    Cutoff = serializers.CharField()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
