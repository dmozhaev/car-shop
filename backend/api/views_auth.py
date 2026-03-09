from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers_auth import SellerLoginSerializer


class SellerLoginView(APIView):
    def post(self, request):
        serializer = SellerLoginSerializer(data=request.data)

        if serializer.is_valid():
            return Response(serializer.validated_data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
