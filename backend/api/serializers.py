from rest_framework import serializers

from .models import Seller


class SellerRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_repeat = serializers.CharField(write_only=True)

    class Meta:
        model = Seller
        fields = ["email", "password", "password_repeat"]

    def validate(self, data):
        if data["password"] != data["password_repeat"]:
            raise serializers.ValidationError("Passwords do not match")
        return data

    def create(self, validated_data):
        password = validated_data.pop("password")
        validated_data.pop("password_repeat")

        seller = Seller(**validated_data)
        seller.set_password(password)
        seller.save()

        return seller
