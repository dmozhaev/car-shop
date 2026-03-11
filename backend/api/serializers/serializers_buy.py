from rest_framework import serializers


class BuyCarSerializer(serializers.Serializer):

    name = serializers.CharField(max_length=200, allow_blank=False)
