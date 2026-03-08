from django.urls import path

from api.views import SellerRegisterView

urlpatterns = [
    path("register/", SellerRegisterView.as_view(), name="register"),
]
