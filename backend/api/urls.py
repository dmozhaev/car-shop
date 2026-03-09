from django.urls import path

from api.views import SellerRegisterView
from api.views_auth import SellerLoginView

urlpatterns = [
    path("register/", SellerRegisterView.as_view(), name="register"),
    path("login/", SellerLoginView.as_view(), name="login"),
]
