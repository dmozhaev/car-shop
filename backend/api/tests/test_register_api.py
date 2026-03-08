from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase

from api.models import Seller


class SellerRegisterAPITest(APITestCase):

    def setUp(self):
        self.url = reverse("register")

    def test_register_success(self):
        data = {
            "email": "seller@test.com",
            "password": "StrongPass123!",
            "password_repeat": "StrongPass123!",
        }

        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Seller.objects.count(), 1)

        seller = Seller.objects.first()
        self.assertEqual(seller.email, data["email"])
        self.assertTrue(seller.check_password(data["password"]))

    def test_register_password_mismatch(self):
        data = {
            "email": "seller@test.com",
            "password": "StrongPass123!",
            "password_repeat": "WrongPass123!",
        }

        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Seller.objects.count(), 0)

    def test_register_duplicate_email(self):
        Seller.objects.create(email="seller@test.com", password="hash")

        data = {
            "email": "seller@test.com",
            "password": "StrongPass123!",
            "password_repeat": "StrongPass123!",
        }

        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Seller.objects.count(), 1)

    def test_register_missing_email(self):
        data = {
            "password": "StrongPass123!",
            "password_repeat": "StrongPass123!",
        }

        response = self.client.post(self.url, data, format="json")

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
