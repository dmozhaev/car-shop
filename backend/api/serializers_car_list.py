from rest_framework import serializers

from .models import Car


class CarListSerializer(serializers.ModelSerializer):

    seller = serializers.CharField(source="seller.email")

    class Meta:
        model = Car
        fields = [
            "id",
            "year",
            "price",
            "seller",
        ]
