from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from api.serializers import CarCreateSerializer


class CarCreateView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        serializer = CarCreateSerializer(
            data=request.data,
            context={"request": request},
        )

        if serializer.is_valid():
            car = serializer.save()
            return Response({"id": car.id}, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
