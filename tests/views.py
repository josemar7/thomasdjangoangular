import random

from rest_framework import viewsets
from rest_framework.response import Response

from words.models import Word
from words.serializers import WordSerializer


class TestWordsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = WordSerializer
    queryset = Word.objects.order_by('?')[:10]

    def list(self, request, *args, **kwargs):
        n = int(request.query_params['num_questions'])
        self.queryset = Word.objects.order_by('?')[:n]

        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)
