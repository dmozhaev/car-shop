from django.test import TestCase

from api.models import Car, Make, Seller
from api.serializers import CarDetailSerializer


class CarDetailSerializerTest(TestCase):

    def setUp(self):

        seller = Seller.objects.create(email="seller@test.com")
        make = Make.objects.create(name="Toyota")

        self.car = Car.objects.create(
            year=2022, price="20000", make=make, seller=seller, description="Nice car"
        )

    def test_serializer_output(self):

        serializer = CarDetailSerializer(self.car)

        data = serializer.data

        self.assertEqual(data["make"], "Toyota")
        self.assertEqual(data["description"], "Nice car")
