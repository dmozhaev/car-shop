from django.test import TestCase

from api.models import Seller
from api.serializers import SellerRegisterSerializer


class SellerRegisterSerializerTest(TestCase):
    def test_serializer_valid_data_creates_user(self):
        data = {
            "email": "seller@test.com",
            "password": "StrongPass123!",
            "password_repeat": "StrongPass123!",
        }

        serializer = SellerRegisterSerializer(data=data)

        self.assertTrue(serializer.is_valid())

        seller = serializer.save()

        self.assertEqual(seller.email, data["email"])
        self.assertTrue(seller.check_password(data["password"]))
        self.assertEqual(Seller.objects.count(), 1)

    def test_serializer_passwords_do_not_match(self):
        data = {
            "email": "seller@test.com",
            "password": "StrongPass123!",
            "password_repeat": "DifferentPass123!",
        }

        serializer = SellerRegisterSerializer(data=data)

        self.assertFalse(serializer.is_valid())
        self.assertIn("password_repeat", serializer.errors)

    def test_serializer_password_too_common(self):
        data = {
            "email": "seller@test.com",
            "password": "asdasdasd",
            "password_repeat": "asdasdasd",
        }

        serializer = SellerRegisterSerializer(data=data)

        self.assertFalse(serializer.is_valid())
        self.assertIn("non_field_errors", serializer.errors)

    def test_serializer_requires_email(self):
        data = {
            "password": "StrongPass123!",
            "password_repeat": "StrongPass123!",
        }

        serializer = SellerRegisterSerializer(data=data)

        self.assertFalse(serializer.is_valid())
        self.assertIn("email", serializer.errors)

    def test_password_is_hashed(self):
        data = {
            "email": "seller@test.com",
            "password": "StrongPass123!",
            "password_repeat": "StrongPass123!",
        }

        serializer = SellerRegisterSerializer(data=data)
        serializer.is_valid(raise_exception=True)

        seller = serializer.save()

        self.assertNotEqual(seller.password, data["password"])
        self.assertTrue(seller.password.startswith("pbkdf2"))
