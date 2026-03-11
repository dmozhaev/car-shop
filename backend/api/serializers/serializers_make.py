from rest_framework import serializers

from api.models import Make


class MakeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Make
        fields = ["id", "name"]
