from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework_simplejwt.tokens import RefreshToken

from api.models import Make, Seller


class CarCreateAPITest(APITestCase):

    def setUp(self):
        self.seller = Seller.objects.create(email="seller@test.com")
        self.seller.set_password("StrongPass123!")
        self.seller.save()

        self.make = Make.objects.create(name="Toyota")

        refresh = RefreshToken.for_user(self.seller)

        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}")

        self.url = reverse("car-create")

    def test_create_car(self):
        data = {"year": 2021, "price": "20000.00", "make": self.make.id}

        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, 201)

    def test_create_car_unauthorized(self):
        self.client.credentials()

        data = {"year": 2020, "price": "10000.00", "make": self.make.id}

        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, 401)

    def test_create_invalid_year(self):
        data = {"year": 1800, "price": "10000.00", "make": self.make.id}

        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, 400)

    def test_create_missing_make(self):
        data = {"year": 2020, "price": "10000.00"}

        response = self.client.post(self.url, data)

        self.assertEqual(response.status_code, 400)
