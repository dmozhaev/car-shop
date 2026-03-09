from django.urls import reverse
from rest_framework.test import APITestCase

from api.models import Car, Make, Seller


class BuyCarAPITest(APITestCase):

    def setUp(self):
        seller = Seller.objects.create(email="seller@test.com")
        make = Make.objects.create(name="Toyota")

        self.car = Car.objects.create(year=2020, price="15000", make=make, seller=seller)

    def test_buy_car(self):
        url = reverse("car-buy", args=[self.car.id])

        response = self.client.post(url, {"name": "John Buyer"})

        self.assertEqual(response.status_code, 200)

        self.car.refresh_from_db()

        self.assertEqual(self.car.status, "sold")

    def test_cannot_buy_sold_car(self):
        self.car.status = "sold"
        self.car.save()

        url = reverse("car-buy", args=[self.car.id])

        response = self.client.post(url, {"name": "John Buyer"})

        self.assertEqual(response.status_code, 400)
