from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.response import Response

from words.models import Word
from words.permissions import IsAuthorOfWord
from words.serializers import WordSerializer


class WordViewSet(viewsets.ModelViewSet):
    queryset = Word.objects.order_by('-created_at')
    serializer_class = WordSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsAuthorOfWord(),)

    def perform_create(self, serializer):
        instance = serializer.save(author=self.request.user)

        return super(WordViewSet, self).perform_create(serializer)



class AccountWordsViewSet(viewsets.ViewSet):
    queryset = Word.objects.select_related('author').all()
    serializer_class = WordSerializer

    def list(self, request, account_username=None):
        queryset = self.queryset.filter(author__username=account_username)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
