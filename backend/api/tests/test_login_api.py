from django.urls import reverse
from rest_framework.test import APITestCase

from api.models import Seller


class LoginAPITest(APITestCase):

    def setUp(self):
        self.seller = Seller(email="seller@test.com")
        self.seller.set_password("StrongPass123!")
        self.seller.save()

        self.url = reverse("login")

    def test_login_success(self):
        data = {"email": "seller@test.com", "password": "StrongPass123!"}

        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, 200)
        self.assertIn("access", response.data)

    def test_login_invalid_password(self):
        data = {"email": "seller@test.com", "password": "wrong"}

        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, 400)
