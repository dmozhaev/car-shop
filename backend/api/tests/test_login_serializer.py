from django.test import TestCase

from api.models import Seller
from api.serializers_auth import SellerLoginSerializer


class SellerLoginSerializerTest(TestCase):

    def setUp(self):
        self.seller = Seller(email="seller@test.com")
        self.seller.set_password("StrongPass123!")
        self.seller.save()

    def test_valid_login(self):
        data = {"email": "seller@test.com", "password": "StrongPass123!"}

        serializer = SellerLoginSerializer(data=data)

        self.assertTrue(serializer.is_valid())
        self.assertIn("access", serializer.validated_data)

    def test_invalid_login(self):
        data = {"email": "seller@test.com", "password": "wrongpass"}

        serializer = SellerLoginSerializer(data=data)

        self.assertFalse(serializer.is_valid())
