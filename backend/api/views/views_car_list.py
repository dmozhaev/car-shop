from rest_framework.generics import ListAPIView

from api.models import Car
from api.serializers import CarListSerializer


class CarListView(ListAPIView):

    serializer_class = CarListSerializer

    def get_queryset(self):
        return (
            Car.objects.select_related("make", "seller")
            .filter(status="available")
            .order_by("-created_at")
        )
