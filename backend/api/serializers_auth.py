from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from .models import Seller


class SellerLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        try:
            seller = Seller.objects.get(email=data["email"])
        except Seller.DoesNotExist:
            raise serializers.ValidationError("Invalid credentials")

        if not seller.check_password(data["password"]):
            raise serializers.ValidationError("Invalid credentials")

        refresh = RefreshToken.for_user(seller)

        return {
            "access": str(refresh.access_token),
            "refresh": str(refresh),
            "seller_id": seller.id,
            "email": seller.email,
        }
