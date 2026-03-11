from django.test import TestCase

from api.models import Car, Make, Seller
from api.serializers import CarListSerializer


class CarListSerializerTest(TestCase):

    def setUp(self):

        seller = Seller.objects.create(email="seller@test.com")
        make = Make.objects.create(name="Toyota")

        self.car = Car.objects.create(year=2022, price="20000", make=make, seller=seller)

    def test_serializer_fields(self):

        serializer = CarListSerializer(self.car)

        data = serializer.data

        self.assertEqual(data["year"], 2022)
        self.assertEqual(data["price"], "20000.00")
        self.assertEqual(data["seller"], "seller@test.com")

        self.assertNotIn("mileage", data)
        self.assertNotIn("fuel_type", data)
