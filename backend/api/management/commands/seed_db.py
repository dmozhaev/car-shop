import random

from django.core.management.base import BaseCommand
from faker import Faker

from api.models import Car, Make, Seller

fake = Faker()


class Command(BaseCommand):
    help = "Seed database with initial development data"

    def handle(self, *args, **kwargs):

        if Make.objects.exists():
            self.stdout.write(self.style.WARNING("Database already seeded. Skipping."))
            return

        self.stdout.write("Seeding database...")

        # ----------------------
        # Car makes
        # ----------------------

        makes = [
            "Toyota",
            "BMW",
            "Audi",
            "Mercedes",
            "Volkswagen",
            "Ford",
            "Honda",
            "Nissan",
            "Hyundai",
            "Kia",
        ]

        make_objects = []

        for name in makes:
            make = Make.objects.create(name=name)
            make_objects.append(make)

        self.stdout.write(self.style.SUCCESS("Created car makes"))

        # ----------------------
        # Default seller
        # ----------------------

        seller = Seller(email="seller@test.com")
        seller.set_password("StrongPass123!")
        seller.save()

        self.stdout.write(self.style.SUCCESS("Created default seller"))

        # ----------------------
        # Random cars
        # ----------------------

        fuel_types = ["Petrol", "Diesel", "Hybrid", "Electric"]
        transmissions = ["Manual", "Automatic"]
        colors = ["Black", "White", "Red", "Blue", "Silver"]

        cars = []

        for _ in range(20):

            car = Car(
                year=random.randint(2005, 2024),
                mileage=random.randint(10_000, 200_000),
                price=random.randint(3000, 40000),
                fuel_type=random.choice(fuel_types),
                transmission=random.choice(transmissions),
                color=random.choice(colors),
                description=fake.sentence(),
                make=random.choice(make_objects),
                seller=seller,
            )

            cars.append(car)

        Car.objects.bulk_create(cars)

        self.stdout.write(self.style.SUCCESS("Created 20 cars"))

        self.stdout.write(self.style.SUCCESS("Database seeded successfully!"))
