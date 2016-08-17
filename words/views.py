import django_filters
from rest_framework import viewsets, permissions
from rest_framework.filters import DjangoFilterBackend, FilterSet, OrderingFilter
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.response import Response
from rest_framework import status
from query_logger import DatabaseQueryLoggerMixin
from words.models import Word, WordType, Parameter
from words.permissions import IsAuthorOfWord
from words.serializers import WordSerializer, WordTypeSerializer, ParameterSerializer

class CreateParent():
    def create(self, request, *args, **kwargs):
        try:
            serializer = self.get_serializer(data=request.data)
            result = serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except Exception as exc:
            return Response(serializer.data, status=666)

    def perform_create(self, serializer):
        return serializer.save(author=self.request.user)

class WordFilter(FilterSet):
    name = django_filters.CharFilter(name="name", lookup_type='startswith')
    translation = django_filters.CharFilter(name="translation", lookup_type='startswith')
    favorite = django_filters.BooleanFilter(name='favorite')
    class Meta:
        model = Word
        fields = ['name', 'translation', 'favorite']

    # favorite = django_filters.BooleanFilter(name='favorite')
    # class Meta:
    #     model = Word
    #     fields = ['favorite']


class WordViewSet(CreateParent, viewsets.ModelViewSet, DatabaseQueryLoggerMixin):
    queryset = Word.objects.order_by('name')
    serializer_class = WordSerializer
    pagination_class = LimitOffsetPagination
    filter_backends = (DjangoFilterBackend, OrderingFilter,)
    filter_class = WordFilter
    ordering_fields = ('name', 'translation', 'favorite')

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset().filter(author__username=request.user.username))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsAuthorOfWord(),)

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

class ParameterViewSet(CreateParent, viewsets.ModelViewSet):
    lookup_field = 'name'
    queryset = Parameter.objects.all()
    serializer_class = ParameterSerializer

    def retrieve(self, request, *args, **kwargs):
        self.queryset = self.get_queryset().filter(author__username=request.user.username)
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        self.queryset = self.get_queryset().filter(author__username=request.user.username)
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
