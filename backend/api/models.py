from django.db import models


# Make / Manufacturer
class Make(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


# Seller
class Seller(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    login = models.CharField(max_length=100, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# Buyer
class Buyer(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


# Car
class Car(models.Model):
    STATUS_CHOICES = [
        ("available", "Available"),
        ("sold", "Sold"),
    ]

    year = models.PositiveIntegerField()
    mileage = models.PositiveIntegerField(blank=True, null=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    fuel_type = models.CharField(max_length=50, blank=True)
    transmission = models.CharField(max_length=50, blank=True)
    color = models.CharField(max_length=50, blank=True)
    description = models.TextField(blank=True)

    make = models.ForeignKey(Make, on_delete=models.CASCADE)
    seller = models.ForeignKey(Seller, on_delete=models.CASCADE)
    buyer = models.ForeignKey(Buyer, on_delete=models.SET_NULL, null=True, blank=True)

    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="available")
    created_at = models.DateTimeField(auto_now_add=True)
    sold_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.make.name} {self.year} - {self.status}"
