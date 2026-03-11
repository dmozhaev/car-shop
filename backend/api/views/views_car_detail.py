from rest_framework.generics import RetrieveAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Buyer, Car
from api.serializers import BuyCarSerializer, CarDetailSerializer


class CarDetailView(RetrieveAPIView):

    queryset = Car.objects.select_related("make", "seller")
    serializer_class = CarDetailSerializer


class BuyCarView(APIView):

    def post(self, request, pk):

        serializer = BuyCarSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=400)

        name = serializer.validated_data["name"]

        try:
            car = Car.objects.get(pk=pk, status="available")
        except Car.DoesNotExist:
            return Response({"error": "Car not available"}, status=400)

        buyer = Buyer.objects.create(name=name)

        car.buyer = buyer
        car.status = "sold"
        car.save()

        return Response({"status": "sold"})
