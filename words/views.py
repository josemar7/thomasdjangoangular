from django.core.paginator import Paginator
from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.pagination import PageNumberPagination, LimitOffsetPagination
from rest_framework.response import Response
from query_logger import DatabaseQueryLoggerMixin
from words.models import Word, WordType
from words.permissions import IsAuthorOfWord
from words.serializers import WordSerializer, WordTypeSerializer


class WordViewSet(viewsets.ModelViewSet, DatabaseQueryLoggerMixin):
    queryset = Word.objects.order_by('name')
    serializer_class = WordSerializer
    pagination_class = LimitOffsetPagination#PageNumberPagination

    # def get_queryset(self):
    #     self.start_query_logging()
    #     words_list = Word.objects.order_by('-id')
    #     self.stop_query_logging()
    #     # paginator = Paginator(words_list, self.request.GET.get('pageSize'))
    #     # page = self.request.GET.get('pageNumber')
    #     # return paginator.page(page)
    #     return words_list

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsAuthorOfWord(),)

    def perform_create(self, serializer):
        instance = serializer.save(author=self.request.user)

        return super(WordViewSet, self).perform_create(serializer)

class WordTypeViewSet(viewsets.ModelViewSet):
    queryset = WordType.objects.order_by('-created_at')
    serializer_class = WordTypeSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), )

    def perform_create(self, serializer):
        instance = serializer.save()

        return super(WordTypeViewSet, self).perform_create(serializer)


class AccountWordsViewSet(viewsets.ViewSet):
    queryset = Word.objects.select_related('author').all()
    serializer_class = WordSerializer

    def list(self, request, account_username=None):
        queryset = self.queryset.filter(author__username=account_username)
        serializer = self.serializer_class(queryset, many=True)

        return Response(serializer.data)
