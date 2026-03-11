from django.test import TestCase

from api.models import Make, Seller
from api.serializers import CarCreateSerializer


class CarSerializerTest(TestCase):

    def setUp(self):
        self.seller = Seller.objects.create(email="seller@test.com")
        self.seller.set_password("StrongPass123!")
        self.seller.save()

        self.make = Make.objects.create(name="Toyota")

    def test_serializer_valid(self):
        data = {"year": 2020, "price": "15000.00", "make": self.make.id}

        serializer = CarCreateSerializer(data=data)

        self.assertTrue(serializer.is_valid())

    def test_invalid_year(self):
        data = {"year": 1800, "price": "10000.00", "make": self.make.id}

        serializer = CarCreateSerializer(data=data)

        self.assertFalse(serializer.is_valid())

    def test_negative_price(self):
        data = {"year": 2020, "price": "-5", "make": self.make.id}

        serializer = CarCreateSerializer(data=data)

        self.assertFalse(serializer.is_valid())
