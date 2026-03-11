from django.urls import path

from api.views import (
    BuyCarView,
    CarCreateView,
    CarDetailView,
    CarListView,
    MakeListView,
    SellerLoginView,
    SellerRegisterView,
)

urlpatterns = [
    path("register/", SellerRegisterView.as_view(), name="register"),
    path("login/", SellerLoginView.as_view(), name="login"),
    path("cars/", CarCreateView.as_view(), name="car-create"),
    path("makes/", MakeListView.as_view(), name="make-list"),
    path("carlist/", CarListView.as_view(), name="car-list"),
    path("cars/<int:pk>/", CarDetailView.as_view(), name="car-detail"),
    path("cars/<int:pk>/buy/", BuyCarView.as_view(), name="car-buy"),
]
