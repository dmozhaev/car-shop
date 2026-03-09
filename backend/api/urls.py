from django.urls import path

from api.views import SellerRegisterView
from api.views_auth import SellerLoginView
from api.views_car import CarCreateView
from api.views_car_list import CarListView
from api.views_make import MakeListView

urlpatterns = [
    path("register/", SellerRegisterView.as_view(), name="register"),
    path("login/", SellerLoginView.as_view(), name="login"),
    path("cars/", CarCreateView.as_view(), name="car-create"),
    path("makes/", MakeListView.as_view(), name="make-list"),
    path("carlist/", CarListView.as_view(), name="car-list"),
]
