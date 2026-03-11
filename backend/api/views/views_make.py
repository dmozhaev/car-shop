from rest_framework.generics import ListAPIView

from api.models import Make
from api.serializers import MakeSerializer


class MakeListView(ListAPIView):

    queryset = Make.objects.all().order_by("name")
    serializer_class = MakeSerializer
