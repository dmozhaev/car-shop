from django.test import TestCase

from api.models import Car, Make, Seller
from api.serializers_car_list import CarListSerializer


class CarListSerializerTest(TestCase):

    def setUp(self):
        self.seller = Seller.objects.create(email="seller@test.com")
        self.seller.set_password("StrongPass123!")
        self.seller.save()

        self.make = Make.objects.create(name="Toyota")

        self.car = Car.objects.create(
            year=2020,
            mileage=80000,
            price="15000.00",
            fuel_type="petrol",
            transmission="manual",
            color="red",
            make=self.make,
            seller=self.seller,
        )

    def test_serializer_fields(self):
        serializer = CarListSerializer(self.car)
        data = serializer.data

        self.assertEqual(data["make"], "Toyota")
        self.assertEqual(data["seller"], "seller@test.com")
        self.assertEqual(data["year"], 2020)
        self.assertEqual(data["price"], "15000.00")

    def test_optional_fields(self):
        car = Car.objects.create(
            year=2021,
            price="20000.00",
            make=self.make,
            seller=self.seller,
        )

        serializer = CarListSerializer(car)
        data = serializer.data

        self.assertIsNone(data["mileage"])
        self.assertEqual(data["make"], "Toyota")
