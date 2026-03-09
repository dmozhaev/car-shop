from rest_framework.generics import ListAPIView

from .models import Car
from .serializers_car_list import CarListSerializer


class CarListView(ListAPIView):

    serializer_class = CarListSerializer

    def get_queryset(self):
        return (
            Car.objects.select_related("make", "seller")
            .filter(status="available")
            .order_by("-created_at")
        )
