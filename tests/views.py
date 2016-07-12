import random

from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response

from words.models import Word
from words.serializers import WordSerializer


class TestWordsViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = WordSerializer
    queryset = Word.objects.order_by('?')

    def list(self, request, *args, **kwargs):

        #request.query_params['num_questions']
        page = self.paginate_queryset(self.queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(self.queryset, many=True)
        return Response(serializer.data)

