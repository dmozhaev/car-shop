from rest_framework import serializers

from .models import Car


class CarCreateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Car
        fields = [
            "year",
            "mileage",
            "price",
            "fuel_type",
            "transmission",
            "color",
            "description",
            "make",
        ]

    def create(self, validated_data):
        seller = self.context["request"].user
        return Car.objects.create(seller=seller, **validated_data)
