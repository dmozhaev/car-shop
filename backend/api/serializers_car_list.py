from rest_framework import serializers

from .models import Car


class CarListSerializer(serializers.ModelSerializer):

    make = serializers.CharField(source="make.name")
    seller = serializers.CharField(source="seller.email")

    class Meta:
        model = Car
        fields = [
            "id",
            "make",
            "year",
            "price",
            "mileage",
            "fuel_type",
            "transmission",
            "color",
            "status",
            "seller",
            "created_at",
        ]
