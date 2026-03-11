from rest_framework import serializers

from api.models import Car


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

    def validate_year(self, value):
        if value < 1900:
            raise serializers.ValidationError("Year must be after 1900")

        return value

    def validate_price(self, value):
        if value <= 0:
            raise serializers.ValidationError("Price must be positive")

        return value

    def create(self, validated_data):
        request = self.context["request"]

        return Car.objects.create(seller=request.user, **validated_data)
