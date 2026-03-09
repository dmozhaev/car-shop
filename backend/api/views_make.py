from rest_framework.generics import ListAPIView

from .models import Make
from .serializers_make import MakeSerializer


class MakeListView(ListAPIView):

    queryset = Make.objects.all().order_by("name")
    serializer_class = MakeSerializer
