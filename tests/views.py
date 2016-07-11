from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response

from words.models import Word
from words.serializers import WordSerializer


class TestWordsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Word.objects.order_by('name')
    serializer_class = WordSerializer

