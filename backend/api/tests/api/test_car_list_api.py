from django.urls import reverse
from rest_framework.test import APITestCase

from api.models import Car, Make, Seller


class CarListAPITest(APITestCase):

    def setUp(self):

        self.seller = Seller.objects.create(email="seller@test.com")
        self.seller.set_password("StrongPass123!")
        self.seller.save()

        self.make = Make.objects.create(name="Toyota")

        Car.objects.create(year=2020, price="15000.00", make=self.make, seller=self.seller)

        self.url = reverse("car-list")

    def test_list_cars(self):

        response = self.client.get(self.url)

        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)

    def test_list_only_available(self):

        Car.objects.create(
            year=2019, price="10000", make=self.make, seller=self.seller, status="sold"
        )

        response = self.client.get(self.url)

        self.assertEqual(len(response.data), 1)
